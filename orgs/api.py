from orgs.models import Event, Organization
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .permissions import IsGetOrIsAuthenticated, IsPostAndIsAuthenticated, IsPostAndIsNotAuthenticated, IsGet
from .serializers import UserSerializer, EventsSerializer, OrgsSerializer, UsernameSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Lead Viewset
class EventsViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [
        IsGetOrIsAuthenticated
    ]
    serializer_class = EventsSerializer

class OrgsViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    permission_classes = [  
        IsGetOrIsAuthenticated
    ]
    serializer_class = OrgsSerializer
    lookup_field = 'slug'

    def list(self, *args, **kwargs):
        #getAll
        if (self.request.GET.get("user") == None):
            queryset = Organization.objects.all()
            serializer = [OrgsSerializer(query).data for query in queryset]

            return Response(serializer)

        #getByOrgUser
        else: 
            query = Organization.objects.filter(user=self.request.GET.get("user"))
            serializer = OrgsSerializer(query[0])

            return Response(serializer.data)
    
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
        return Response(serializer.data, status=200)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [  
        IsGet
    ]
    serializer_class = UsernameSerializer

    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
            checkIfOrg = Organization.objects.filter(user__id=pk)

            serializer = OrgsSerializer(checkIfOrg[0]).data
            return Response(serializer)
        except:
            serializer = UsernameSerializer(User.objects.get(id=pk)).data
            return Response(serializer)

    #getByUsername
    def list(self, *args, **kwargs):
        #query = User.objects.filter(username=self.request.GET.get("user"))
        
        query = User.objects.all()

        if not query:
            return Response("signup")
        else:
            serializer = UsernameSerializer(query[0])
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
