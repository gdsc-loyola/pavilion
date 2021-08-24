from rest_framework import serializers
from orgs.models import *

# Event serializer
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = "__all__"