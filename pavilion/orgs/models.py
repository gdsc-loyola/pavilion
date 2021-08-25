from django.db import models

# Create your models here.
class Event(models.Model):
    status_choices = [
        ("Published", "Published"),
        ("Draft", "Draft")
    ]

    name = models.CharField(max_length=100)
    start_date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False, blank=False)
    last_updated = models.DateField(auto_now=True, auto_now_add=False)
    status = models.CharField(max_length=50, choices=status_choices)

    def __str__(self):
        return "{}, from {} to {}, {}. Modified on {}".format(self.name, self.start_date, self.end_date, self.status, self.last_updated)

    