from django.db import models

# Create your models here.
class Events(models.Model):
    status_choices = [
        ("Published", "Published"),
        ("Draft", "Draft")
    ]

    name = models.CharField(max_length=100)
    event_date = models.DateField(auto_now=False, auto_now_add=False)
    last_updated = models.DateField(auto_now=True, auto_now_add=False)
    status = models.CharField(max_length=50, choices=status_choices)
    