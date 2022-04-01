from django.db import models
from django.contrib.auth.models import User, BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

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
    facebook = models.CharField(max_length=100, null=True, blank=True)
    instagram = models.CharField(max_length=100, null=True, blank=True)
    twitter = models.CharField(max_length=100, null=True, blank=True)
    linkedin = models.CharField(max_length=100, null=True, blank=True)
    website = models.CharField(max_length=100, null=True, blank=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return "{}({}), {}. {}".format(self.name, self.short_name, self.org_body, self.user)

class Event(models.Model):
    status_choices = [
        ("Draft","Draft"),
        ("Ongoing","Ongoing"),
        ("Completed","Completed"),
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
    accepting_responses = models.BooleanField(default=False)
    is_past_event = models.BooleanField(default=False)
    org = models.ForeignKey(Organization, on_delete=models.SET_NULL, related_name="events", null=True)

    # Not required attributes when is_past_event = True
    old_respondents = models.CharField(max_length=500, blank=True)
    form_description = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return "{}, from {} to {}, {}. Modified on {} by {}".format(self.name, self.start_date, self.end_date, self.status, self.last_updated, self.org.short_name)

class Student(models.Model):
    year_choices = [
            ('1st Year', '1st Year'),
            ('2nd Year', '2nd Year'),
            ('3rd Year', '3rd Year'),
            ('4th Year', '4th Year'),
            ('5th Year', '5th Year'),
            ('6th Year', '6th Year'),
            ('7th Year', '7th Year'),
        ]
    
    name = models.CharField(max_length=1024)
    id_number = models.IntegerField(unique=True)
    email = models.EmailField(max_length=200, null=True)
    year = models.CharField(max_length=100, choices=year_choices)
    course = models.CharField(max_length=128)

    def __str__(self):
        return "{}".format(self.id_number)
    
class StudentToEvent(models.Model):
    
    event = models.ForeignKey(Event, related_name='student', on_delete=models.CASCADE, default=None, blank=True, null=True)
    student = models.ManyToManyField(Student, related_name='event', default=None, blank=True)
    date_submitted = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.event)
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