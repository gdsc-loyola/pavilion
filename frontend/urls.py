from django.urls import path
from . import views


urlpatterns = [
    path('admin/', views.index),
    path('admin/events/', views.index),
    path('admin/login/', views.index)
]