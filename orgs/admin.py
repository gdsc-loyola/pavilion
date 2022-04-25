from django.contrib import admin
from .models import Event, Organization, StudentToEvent, Student

# Register your models here.
admin.site.register(Event)
admin.site.register(Organization)
admin.site.register(Student)
admin.site.register(StudentToEvent)