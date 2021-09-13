from rest_framework import serializers
from orgs.models import Event, Org
from django.contrib.auth.models import User

# Event serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("id", "name", "start_date", "end_date", "last_updated", "status")

class OrgsSerializer(serializers.HyperlinkedModelSerializer):
    events = EventsSerializer(read_only=True, many=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Org
        fields = ("id", "name", "short_name", "desc", "org_body", "user", "events")