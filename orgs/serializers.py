from dataclasses import fields
from rest_framework import serializers
from orgs.models import Event, Organization, StudentToEvent, Student
from django.contrib.auth.models import User


# Event serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class OrgDetailInEventSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="orgs-detail", lookup_field="slug"
    )

    class Meta:
        model = Organization
        fields = ["url", "name", "short_name", "slug"]
        lookup_field = "slug"


class EventsSerializer(serializers.ModelSerializer):
    org = OrgDetailInEventSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


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
            "events",
        )
        lookup_field = "slug"


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="student-detail", lookup_field="id_number"
    )

    class Meta:
        model = Student
        fields = "__all__"
        lookup_field = "id_number"


class StudentToEventSerializer(serializers.ModelSerializer):
    event = EventsSerializer(read_only=True)
    student = StudentSerializer(read_only=True, many=True)

    class Meta:
        model = StudentToEvent
        fields = "__all__"
