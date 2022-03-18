from coreapi import Object
import jwt
from orgs.models import Event, Organization, StudentToEvent, Student
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsGetOrIsAuthenticated, IsPostAndIsAuthenticated, IsPostAndIsNotAuthenticated, IsGet
from .serializers import UserSerializer, EventsSerializer, OrgsSerializer, UsernameSerializer, StudentToEventSerializer, StudentSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.db.utils import IntegrityError
from functools import wraps

import os
from mixpanel import Mixpanel

mp = Mixpanel(os.environ['MIXPANEL_API_TOKEN'])
# Lead Viewset
class EventsViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [
        IsGetOrIsAuthenticated
    ]
    serializer_class = EventsSerializer

    def retrieve(self, request, pk, *args, **kwargs):
        current_event = Event.objects.get(pk=pk)
        query = current_event.student.all() #.student comes from related_name in models.py
        if query:
            serializer = StudentToEventSerializer(query, many=True)
            return Response(serializer.data)
        serializer = EventsSerializer(current_event)
        return Response(serializer.data)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [IsGetOrIsAuthenticated]
    serializer_class = StudentSerializer
    lookup_field = 'id_number'

class StudentToEventViewSet(viewsets.ModelViewSet):
    queryset = StudentToEvent.objects.all()
    permission_classes = [
        IsGetOrIsAuthenticated
    ]
    serializer_class = StudentToEventSerializer

    def create(self, request):
        try:
            event = Event.objects.get(id = request.data["event"])
            students = [Student.objects.get(id_number = x) for x in request.data["students"]]
            query, created = StudentToEvent.objects.get_or_create(
                event = event,
            )
            if not created:
                raise IntegrityError
            query.student.set(students)

        except IntegrityError:
            return Response(f'Event already exists, use patch or put instead on event with id={request.data["event"]}', status=400)
        except ObjectDoesNotExist:
            return Response('One of the passed in IDs can\'t be found', status=404)
        except MultipleObjectsReturned:
            return Response("Multiple objects found where multiple is not allowed", status=500)
        
        serializer = StudentToEventSerializer(query)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        event = Event.objects.get(id = request.data["event"])
        students = [Student.objects.get(id_number = x) for x in request.data["students"]]
        query = StudentToEvent.objects.get(event=event)
        query.student.set(students)
        serializer = StudentToEventSerializer(query)
        return Response(serializer.data)

class OrgsViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    permission_classes = [  
        IsGetOrIsAuthenticated
    ]
    serializer_class = OrgsSerializer
    lookup_field = 'slug'

    def list(self, *args, **kwargs):
        #getByOrgUser
        if self.request.user.is_authenticated:
            try:
                query = Organization.objects.get(user=self.request.user)
            except ObjectDoesNotExist:
                return Response("Organization not found", status=404)
            except MultipleObjectsReturned:
                return Response("Multiple Orgs found for current user", status=512)
            serializer = OrgsSerializer(query)
            return Response(serializer.data)

        #getAll
        queryset = Organization.objects.all()
        serializer = [OrgsSerializer(query).data for query in queryset]
        return Response(serializer)

    def update(self, id, *args, **kwargs):
        instance = Organization.objects.get( id = id )

        if not instance:
            # return Response(status=status.HTTP_404_NOT_FOUND)
            return Response("Instance not found.", status=404)
        print(self.request.data)
        serializer = self.get_serializer(instance, data=self.request.data, partial=True)

        if not serializer.is_valid():
            return Response("Serializer not valid.", status=401)
        serializer.save()
        print(serializer.data['name'])
        mp.track(serializer.data['name'], "Updated org information", {
            'old_data': OrgsSerializer(instance).data,
            'new_data': serializer.data
        })
        return Response(serializer.data, status=200)

    def create(self, request):
        """
        Method to create new orgs
        data should be FormData in axios
        """
        # required attributes
        name = request.data['name']
        short_name = request.data['short_name']
        slug = request.data['slug']
        desc = request.data['desc']
        org_body = request.data['org_body']
        user = request.user

        # optional attributes
        # request.FILES=True if there's a file sent and request is sent with headers: { "Content-Type": "multipart/form-data" }
        logo = request.FILES.get('logo') if request.FILES else ''
        facebook = request.data['facebook'] if 'facebook' in request.data else ''
        instagram = request.data['instagram'] if 'instagram' in request.data else ''
        twitter = request.data['twitter'] if 'twitter' in request.data else ''
        linkedin = request.data['linkedin'] if 'linkedin' in request.data else ''
        website = request.data['website'] if 'website' in request.data else ''
        
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

        serializer = OrgsSerializer(new_org)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [  
        IsGet
    ]
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

    #getByUsername
    def list(self, request, *args, **kwargs):
        userToCheck = request.query_params.get('user', None)
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
    permission_classes = [  
        IsPostAndIsNotAuthenticated
    ]
    serializer_class = UserSerializer

    def create(self, request):
        username = request.data["username"]
        password = "9,2Nli1H:C&Vmyl<9:Y)VV1t[jQN7rS7Laf|sip*]X_Fi)IX5"

        new_user = User.objects.create(
            username = username,
            password = make_password(password)
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
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope
