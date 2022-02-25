from django.contrib import admin
from .models import Event, Organization, StudentToEvent

# Register your models here.
admin.site.register(Event)
admin.site.register(Organization)
admin.site.register(StudentToEvent)