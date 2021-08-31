from rest_framework import serializers
from orgs.models import *

# Event serializer
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"