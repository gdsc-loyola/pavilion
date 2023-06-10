from rest_framework import routers
from django.urls import path, include
from .api import EventsViewSet, OrgsViewSet, RegisterViewSet, UserViewSet, StudentToEventViewSet, StudentViewSet, OrganizationAccountCreateListViewSet, OrganizationAccountDetailViewSet

router = routers.DefaultRouter()
router.register(r"orgs", OrgsViewSet, "orgs")
router.register(r"events", EventsViewSet, "events")
router.register(r"register", RegisterViewSet, "register")
router.register(r"users", UserViewSet, "users")
router.register(r"event-student", StudentToEventViewSet, "event-student")
router.register(r"students", StudentViewSet)
router.register(r"orgcreation", OrganizationAccountCreateListViewSet, "orgcreation")
router.register(r"orgdetail", OrganizationAccountDetailViewSet, "orgdetail")

urlpatterns = [
    path("api/", include(router.urls))
]