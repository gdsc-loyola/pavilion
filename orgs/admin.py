from django.contrib import admin
from .models import Event, Organization

# Register your models here.
admin.site.register(Event)
admin.site.register(Organization)