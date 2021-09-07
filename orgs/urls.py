from rest_framework import routers
from django.urls import path, include
from .api import EventsViewSet, OrgsViewSet

router = routers.DefaultRouter()
router.register(r"orgs", OrgsViewSet, "orgs")
router.register(r"events", EventsViewSet, "events")

urlpatterns = [
    path("api/", include(router.urls))
]