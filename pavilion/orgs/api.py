from orgs.models import Event
from rest_framework import viewsets, permissions
from .serializers import EventsSerializer

# Lead Viewset
class EventsViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EventsSerializer