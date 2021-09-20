from rest_framework import serializers
from orgs.models import Event, Org
from django.contrib.auth.models import User

# Event serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id", 
            "username", 
            "password")

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username")

class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id", 
            "name",
            "cover_photo",
            "start_date", 
            "end_date", 
            "location",
            "desc",
            "event_photo1",
            "event_photo2",
            "event_photo3",
            "event_photo4",
            "last_updated",
            "status", 
            "orgs")

class OrgsSerializer(serializers.HyperlinkedModelSerializer):
    events = EventsSerializer(read_only=True, many=True)
    #user = UserSerializer(read_only=True)

    class Meta:
        model = Org
        fields = (
            "id",
            "name", 
            "short_name", 
            "desc", 
            "org_body",
            "logo",
            "facebook", 
            "instagram", 
            "twitter", 
            "linkedin", 
            "website",
            "user",
            "events")