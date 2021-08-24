from orgs.models import *
from rest_framework import viewsets, permissions
from .serializers import EventsSerializer

# Lead Viewset
class EventViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    permission_classes = [
        permissions.Allowany
    ]
    serializer_class = EventsSerializer