from rest_framework import routers
from django.urls import path, include
from .api import *

router = routers.DefaultRouter()
router.register(r"orgs", OrgsViewSet, "orgs")
router.register(r"events", EventsViewSet, "events")
router.register(r"register", RegisterViewSet, "register")
router.register(r"users", UserViewSet, "users")
router.register(r"event-student", StudentToEventViewSet, "event-student")
router.register(r"students", StudentViewSet)
router.register(r"orgcreation", OrganizationAccountViewSet, basename="orgcreation")
router.register(r"orgdetail", OrganizationAccountViewSet, basename="orgdetail")

urlpatterns = [
    path("api/", include(router.urls))
]