from rest_framework import routers
from .api import EventViewSet

router = router.DefaultRouter()
router.register("api/orgs", EventViewSet, "orgs")

urlpatterns = router.urls
