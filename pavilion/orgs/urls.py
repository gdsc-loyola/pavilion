from rest_framework import routers
from django.urls import path, include
from .api import EventsViewSet

router = routers.DefaultRouter()
router.register(r"orgs", EventsViewSet, "orgs")

urlpatterns = [
    path("api/", include(router.urls))
]