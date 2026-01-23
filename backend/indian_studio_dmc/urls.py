from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from places.api import PlaceViewSet
from foods.api import FoodViewSet
from shops.api import ShopViewSet
from gems.api import HiddenGemViewSet, HiddenGemSubmissionView
from events.api import EventViewSet
from stories.api import ArticleViewSet
from mediaapp.api import PhotoViewSet
from users.api import ProfileViewSet

router = routers.DefaultRouter()
router.register(r"places", PlaceViewSet, basename="place")
router.register(r"foods", FoodViewSet, basename="food")
router.register(r"shops", ShopViewSet, basename="shop")
router.register(r"gems", HiddenGemViewSet, basename="gem")
router.register(r"events", EventViewSet, basename="event")
router.register(r"stories", ArticleViewSet, basename="story")
router.register(r"photos", PhotoViewSet, basename="photo")
router.register(r"profiles", ProfileViewSet, basename="profile")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/gems/submit/", HiddenGemSubmissionView.as_view(), name="gem-submit"),
    path("api/", include(router.urls)),
    path("api/auth/", include("users.auth_urls")),
]
