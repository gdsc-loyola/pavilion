from rest_framework import routers
from .api import EventsViewSet

router = routers.DefaultRouter()
router.register("api/orgs", EventsViewSet, "orgs")

urlpatterns = router.urls
