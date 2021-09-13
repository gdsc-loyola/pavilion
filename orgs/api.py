from orgs.models import Event, Org
from rest_framework import viewsets, permissions
from rest_framework.response import Response
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

    #override post to include events
    def create(self, request, *args, **kwargs):
        data = request.data

        new_org = Org.objects.create(
            name        = data["name"], 
            short_name  = data["short_name"], 
            desc        = data["desc"], 
            org_body    = data["org_body"], 
            user        = data["user"], 
        )

        new_org.save()

        #ask to clarify logic
        for event in data["events"]:
            event_obj = Event.objects.get(id=event["id"]) 
            new_org.events.add(event_obj) #only adds existing events into orgs

        serializer = OrgsSerializer(new_org)

        return Response(serializer.data)
