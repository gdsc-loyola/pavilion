from django.db import models
from django.contrib.auth.models import User, BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

class Event(models.Model):
    status_choices = [
        ("Published", "Published"),
        ("Draft", "Draft")
    ]

    name = models.CharField(max_length=100)
    cover_photo = models.ImageField(upload_to='coverphoto/', blank=True)
    start_date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    location = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    event_photo1 = models.ImageField(upload_to='events/', blank=True)
    event_photo2 = models.ImageField(upload_to='events/', blank=True)
    event_photo3 = models.ImageField(upload_to='events/', blank=True)
    event_photo4 = models.ImageField(upload_to='events/', blank=True)
    last_updated = models.DateField(auto_now=True, auto_now_add=False)
    status = models.CharField(max_length=50, choices=status_choices)

    def __str__(self):
        return "{}, from {} to {}, {}. Modified on {}".format(self.name, self.start_date, self.end_date, self.status, self.last_updated)

class Organization(models.Model):
    org_body_choices = [
        ("COA", "COA"),
        ("LIONS", "LIONS"),
        ("Sanggu", "Sanggu")
    ]

    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    slug = models.CharField(max_length=15) 
    desc = models.CharField(max_length=500)
    org_body = models.CharField(max_length=100, choices=org_body_choices)
    logo = models.ImageField(upload_to='logos/', blank=True)
    facebook = models.CharField(max_length=100, null=True)
    instagram = models.CharField(max_length=100, null=True)
    twitter = models.CharField(max_length=100, null=True)
    linkedin = models.CharField(max_length=100, null=True)
    website = models.CharField(max_length=100, null=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    events = models.ManyToManyField(Event, related_name='orgs', blank=True)
    
    def __str__(self):
        return "{}({}), {}. {}".format(self.name, self.short_name, self.org_body, self.user)

class StudentToEvent(models.Model):
    event = models.ForeignKey(Event, related_name='student', on_delete=models.CASCADE)
    name = models.CharField(max_length=1024)
    id_number = models.IntegerField()
    year = models.IntegerField()
    course = models.CharField(max_length=32)
    date_submitted = models.DateTimeField()
    last_updated = models.DateTimeField()

    def __str__(self):
        return "{}-{}".format(self.event, self.name)
"""
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError("Email should be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError("Superuser must be a staff user.")
        if kwargs.get('is_superuser') is not True:
            raise ValueError("Superuser must be have superuser credentials.")
        return self.create_user(email, password, **kwargs)


class Organization(AbstractBaseUser, PermissionsMixin):
    org_body_choices = [
        ("COA", "COA"),
        ("LIONS", "LIONS"),
        ("Sanggu", "Sanggu")
    ]

    email = models.EmailField(unique = True)
    is_staff = models.BooleanField(default = False)
    is_active = models.BooleanField(default = True)
    
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    org_body = models.CharField(max_length=100, choices=org_body_choices)
    logo = models.CharField(max_length=100)
    facebook = models.CharField(max_length=100, null=True)
    instagram = models.CharField(max_length=100, null=True)
    twitter = models.CharField(max_length=100, null=True)
    linkedin = models.CharField(max_length=100, null=True)
    website = models.CharField(max_length=100, null=True)
    events = models.ManyToManyField(Event, related_name='orgs', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return "{}({}), {}. {}".format(self.name, self.short_name, self.org_body, self.email)
"""