from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    status_choices = [
        ("Published", "Published"),
        ("Draft", "Draft")
    ]

    name = models.CharField(max_length=100)
    start_date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    last_updated = models.DateField(auto_now=True, auto_now_add=False)
    location = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    status = models.CharField(max_length=50, choices=status_choices)

    def __str__(self):
        return "{}, from {} to {}, {}. Modified on {}".format(self.name, self.start_date, self.end_date, self.status, self.last_updated)

class Org(models.Model):
    org_body_choices = [
        ("COA", "COA"),
        ("LIONS", "LIONS"),
        ("Sanggu", "Sanggu")
    ]

    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    org_body = models.CharField(max_length=100, choices=org_body_choices)
    user = models.CharField(max_length=100)
    #user =  models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    events = models.ManyToManyField(Event, related_name='orgs')
    facebook = models.CharField(max_length=100, null=True)
    instagram = models.CharField(max_length=100, null=True)
    twitter = models.CharField(max_length=100, null=True)
    linkedin = models.CharField(max_length=100, null=True)
    website = models.CharField(max_length=100, null=True)


    def __str__(self):
        return "{}({}), {}. {}".format(self.name, self.short_name, self.org_body, self.user)



    