from orgs.models import Event, Org
from rest_framework import viewsets, permissions
from .serializers import EventsSerializer, OrgsSerializer

# Lead Viewset
class EventsViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EventsSerializer

class OrgsViewSet(viewsets.ModelViewSet):
    queryset = Org.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OrgsSerializer