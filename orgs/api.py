import jwt
from orgs.models import Event, Organization, StudentToEvent, Student
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import (
    IsGetOrIsAuthenticated,
    IsPostAndIsAuthenticated,
    IsPostAndIsNotAuthenticated,
    IsGet,
)
from .serializers import (
    UserSerializer,
    EventsSerializer,
    OrgsSerializer,
    UsernameSerializer,
    StudentToEventSerializer,
    StudentSerializer,
)
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from functools import wraps

import os
from mixpanel import Mixpanel

mp = Mixpanel(os.environ["MIXPANEL_API_TOKEN"])


# Lead Viewset
class EventsViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [IsGetOrIsAuthenticated]
    serializer_class = EventsSerializer

    def retrieve(self, request, pk, *args, **kwargs):
        current_event = Event.objects.get(pk=pk)
        query = (
            current_event.student.all()
        )  # .student comes from related_name in models.py
        if query:
            serializer = StudentToEventSerializer(query, many=True)
            return Response(serializer.data)
        serializer = EventsSerializer(current_event, context={"request": request})
        return Response(serializer.data)

    def create(self, request):
        if self.request.user.is_authenticated:
            user = request.user

            # required attributes
            name = request.data["name"]
            cover_photo = (
                request.data["cover_photo"] if "cover_photo" in request.data else ""
            )
            org = Organization.objects.get(user=self.request.user)
            desc = request.data["desc"]
            location = request.data["location"]
            event_photo1 = (
                request.data["event_photo1"] if "event_photo1" in request.data else ""
            )
            event_photo2 = (
                request.data["event_photo2"] if "event_photo2" in request.data else ""
            )
            event_photo3 = (
                request.data["event_photo3"] if "event_photo3" in request.data else ""
            )
            event_photo4 = (
                request.data["event_photo4"] if "event_photo4" in request.data else ""
            )
            start_date = request.data["start_date"]
            end_date = request.data["end_date"]
            status = request.data["status"]
            accepting_responses = (
                request.data["accepting_responses"]
                if "accepting_responses" in request.data
                else False
            )
            is_past_event = (
                request.data["is_past_event"]
                if "is_past_event" in request.data
                else False
            )

            new_event = Event.objects.create(
                name=name,
                cover_photo=cover_photo,
                org=org,
                desc=desc,
                location=location,
                event_photo1=event_photo1,
                event_photo2=event_photo2,
                event_photo3=event_photo3,
                event_photo4=event_photo4,
                status=status,
                accepting_responses=accepting_responses,
                is_past_event=is_past_event,
                start_date=start_date,
                end_date=end_date,
            )
            new_event.save()

            serializer = EventsSerializer(new_event, context={"request": request})
            return Response(serializer.data)

        else:
            return Response("Must be authenticated", status=401)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [IsGetOrIsAuthenticated]
    serializer_class = StudentSerializer
    lookup_field = "id_number"


class StudentToEventViewSet(viewsets.ModelViewSet):
    queryset = StudentToEvent.objects.all()
    permission_classes = [IsGetOrIsAuthenticated]
    serializer_class = StudentToEventSerializer


class OrgsViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    permission_classes = [IsGetOrIsAuthenticated]
    serializer_class = OrgsSerializer
    lookup_field = "slug"

    def list(self, *args, **kwargs):
        # getByOrgUser
        if self.request.user.is_authenticated:
            try:
                query = Organization.objects.get(user=self.request.user)
            except ObjectDoesNotExist:
                return Response("Organization not found", status=404)
            except MultipleObjectsReturned:
                return Response("Multiple Orgs found for current user", status=512)
            serializer = OrgsSerializer(query, context={"request": self.request})
            return Response(serializer.data)

        # getAll
        queryset = Organization.objects.all()
        serializer = [
            OrgsSerializer(query, context={"request": self.request}).data
            for query in queryset
        ]
        return Response(serializer)

    def update(self, request, *args, **kwargs):
        print(request.data["id"])
        instance = Organization.objects.get(id=request.data["id"])

        if not instance:
            # return Response(status=status.HTTP_404_NOT_FOUND)
            return Response("Instance not found.", status=404)
        serializer = self.get_serializer(
            instance, data=self.request.data, partial=True, context={"request": request}
        )

        if not serializer.is_valid():
            return Response("Serializer not valid.", status=401)
        serializer.save()
        mp.track(
            serializer.data["name"],
            "Updated org information",
            {
                "old_data": OrgsSerializer(instance, context={"request": request}).data,
                "new_data": serializer.data,
            },
        )
        return Response(serializer.data, status=200)

    def create(self, request):
        """
        Method to create new orgs
        data should be FormData in axios
        """
        # required attributes
        name = request.data["name"]
        short_name = request.data["short_name"]
        slug = request.data["slug"]
        desc = request.data["desc"]
        org_body = request.data["org_body"]
        user = request.user

        # optional attributes
        # request.FILES=True if there's a file sent and request is sent with headers: { "Content-Type": "multipart/form-data" }
        logo = request.FILES.get("logo") if request.FILES else ""
        facebook = request.data["facebook"] if "facebook" in request.data else ""
        instagram = request.data["instagram"] if "instagram" in request.data else ""
        twitter = request.data["twitter"] if "twitter" in request.data else ""
        linkedin = request.data["linkedin"] if "linkedin" in request.data else ""
        website = request.data["website"] if "website" in request.data else ""

        new_org = Organization.objects.create(
            name=name,
            short_name=short_name,
            slug=slug,
            desc=desc,
            org_body=org_body,
            user=user,
            logo=logo,
            facebook=facebook,
            instagram=instagram,
            twitter=twitter,
            linkedin=linkedin,
            website=website,
        )
        new_org.save()

        serializer = OrgsSerializer(new_org, context={"request": request})
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsGet]
    serializer_class = UsernameSerializer

    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
            print(request.query_params)
            checkIfOrg = Organization.objects.filter(user__username=pk)

            serializer = OrgsSerializer(checkIfOrg[0]).data
            return Response(serializer)
        except:
            serializer = UsernameSerializer(User.objects.get(id=pk)).data
            return Response(serializer)

    # getByUsername
    def list(self, request, *args, **kwargs):
        userToCheck = request.query_params.get("user", None)
        if userToCheck is not None:
            print(self.request.query_params)
            query = User.objects.get(username=userToCheck)

            if not query:
                return Response("signup")
            return Response(UsernameSerializer(query).data)
        else:
            query = User.objects.all()
            serializer = UsernameSerializer(query, many=True)
            return Response(serializer.data)


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsPostAndIsNotAuthenticated]
    serializer_class = UserSerializer

    def create(self, request):
        username = request.data["username"]
        password = "9,2Nli1H:C&Vmyl<9:Y)VV1t[jQN7rS7Laf|sip*]X_Fi)IX5"

        new_user = User.objects.create(
            username=username, password=make_password(password)
        )

        new_user.save()
        serializer = UserSerializer(new_user)

        return Response(serializer.data)


# Auth0 Scope Validation
# to use: @requires_scope('scope')
# example scope 'read:messages' | change permissions in auth0 dashboard
def get_token_auth_header(request):
    """
    Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token


def requires_scope(required_scope):
    """
    Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """

    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse(
                {"message": "You don't have access to this resource"}
            )
            response.status_code = 403
            return response

        return decorated

    return require_scope
