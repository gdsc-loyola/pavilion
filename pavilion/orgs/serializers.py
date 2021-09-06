from rest_framework import serializers
from orgs.models import Event, Org

# Event serializer
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class OrgsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Org
        fields = "__all__"