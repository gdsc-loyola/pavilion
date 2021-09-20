from orgs.models import Event, Org
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
    queryset = Org.objects.all()
    permission_classes = [  
        IsGetOrIsAuthenticated
    ]
    serializer_class = OrgsSerializer

    
    def list(self, *args, **kwargs):
        #getAll
        if (self.request.GET.get("user") == None):
            queryset = Org.objects.all()
            serializer = [OrgsSerializer(query).data for query in queryset]

            return Response(serializer)

        #getByOrgUser
        else: 
            query = Org.objects.filter(user=self.request.GET.get("user"))
            serializer = OrgsSerializer(query[0])

            return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [  
        IsGet
    ]
    serializer_class = UsernameSerializer

    def list(self, *args, **kwargs):
        query = User.objects.filter(username=self.request.GET.get("user"))
        serializer = UsernameSerializer(query[0])

        return Response(serializer.data)
    
class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [  
        IsPostAndIsNotAuthenticated
    ]
    serializer_class = UserSerializer

    def create(self, request):
        username = request.POST["username"]
        password = "9,2Nli1H:C&Vmyl<9:Y)VV1t[jQN7rS7Laf|sip*]X_Fi)IX5"

        new_user = User.objects.create(
            username = username,
            password = make_password(password)
        )

        new_user.save()
        serializer = UserSerializer(new_user)

        return Response(serializer.data)
