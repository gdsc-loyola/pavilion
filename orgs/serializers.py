from dataclasses import fields
from rest_framework import serializers
from orgs.models import Event, Organization, StudentToEvent, Student, OrganizationAccount
from django.contrib.auth.models import User
from .models import *
from django.shortcuts import get_object_or_404

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


class OrgDetailInEventSerializer(serializers.HyperlinkedModelSerializer):    
    url = serializers.HyperlinkedIdentityField(view_name='orgs-detail', lookup_field='slug')
    class Meta:
        model = Organization
        fields = [ 'url', 'name', 'short_name', 'slug' ]
        lookup_field = 'slug'

class EventsSerializer(serializers.ModelSerializer):
    org = OrgDetailInEventSerializer(read_only=True)
    class Meta:
        model = Event
        fields = '__all__'

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






'''
This is the Serializer for Org Account
Used to verify Org account details if needed
 '''
class OrganizationAccountSerializer(serializers.ModelSerializer):
    org = OrgsSerializer(read_only=True, many= True)
    class Meta:
        model = OrganizationAccount
        fields = (
            'name',
            'email',
            'password',
            'org'
        )
        '''
        #Unclear of 'organization' data field will truly contain the Foreign Key Organization data 
        when passed as JSON
        '''

class OrganizationCreateAccountSerializer(serializers.ModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name='orgcreation')

    class Meta:
        model = OrganizationAccount
        fields = (
            'name',
            'email',
            'password',
        )

        '''
        #Unclear of 'organization' data field will truly contain the Foreign Key Organization data 
        when passed as JSON
        '''

class OrganizationAccountLoginSerializer(serializers.ModelSerializer):
    model = OrganizationAccount
    def get_Checker(self,obj):
        #Obj is the model object
        account = OrganizationAccount.objects.filter(email=obj.email)
        if account == None or obj.password != account.password:
            return False
        else:
            return True

    class Meta:
        fields = (
            'email',
            'password',
            'Checker'
        )

class OrganizationUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrganizationAccount
        fields = (
            'name',
            'password',
            'email'
        )






class StudentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='student-detail', lookup_field='id_number')
    class Meta:
        model = Student
        fields = '__all__'
        lookup_field = 'id_number'


class StudentToEventSerializer(serializers.ModelSerializer):
    event = EventsSerializer(read_only=True)
    student = StudentSerializer(read_only=True, many=True)
    class Meta:
        model = StudentToEvent
        fields = '__all__'