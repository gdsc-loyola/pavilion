from dataclasses import fields
from rest_framework import serializers
from orgs.models import Event, Organization, StudentToEvent, Student, OrganizationAccount
from django.contrib.auth.models import User
from .models import *
from django.shortcuts import get_object_or_404
import json

# Event serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = (
        #     "id", 
        #     "username")
        fields = '__all__'

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
These are the Serializers for Org Account
Used to verify Org account details if needed
 '''

#Gets all the data of users that ARE Organization Account
class OrganizationAccountUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

#Used to Fetch Organization Account data with relation to user
class OrganizationAccountSerializer(serializers.ModelSerializer):
    org = OrgsSerializer(read_only=True)
    user = OrganizationAccountUserSerializer(read_only=True)
    class Meta:
        model = OrganizationAccount
        fields = [
            'user',
            'name',
            'email',
            'password',
            'org'
        ]
        '''
        #Unclear of 'organization' data field will truly contain the Foreign Key Organization data 
        when passed as JSON
        '''

#Serializer for the fields needed when creating an Organization Account
class OrganizationCreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationAccount
        fields = (
            'name',
            'email',
            'password',
        )

#Serializer for validating the Login of an Organization Account
class OrganizationAccountLoginSerializer(serializers.ModelSerializer):
    model = OrganizationAccount
    Checker = serializers.SerializerMethodField('get_Checker')
    def get_Checker(self, obj):
        #self.context.get('request) fetches JSON data that we passed to the request parameter in backend
        request = self.context.get('request')
        account = OrganizationAccount.objects.filter(email=request['email'])

        #If length is 0, then there are no results
        if len(account) == 0:
            return 'No Account exists'
        
        if request['password'] != account[0].password:
            return 'Wrong Password'
        else:
            return {
                'username' : account[0].name,
                'password' : account[0].password,
                'Response' : 'Login Success!'
                    }

    class Meta:
        model = OrganizationAccount
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