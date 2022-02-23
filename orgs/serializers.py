from rest_framework import serializers
from orgs.models import Event, Organization, StudentToEvent
from django.contrib.auth.models import User

# Event serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id", 
            "username")

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
    user = UserSerializer(read_only=True)

    class Meta:
        model = Organization
        fields = (
            "id",
            "name", 
            "short_name",
            "slug", 
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
        lookup_field = 'slug'

class StudentToEventSerializer(serializers.ModelSerializer):
    event = EventsSerializer(read_only=True)
    class Meta:
        model = StudentToEvent
        fields = '__all__'
