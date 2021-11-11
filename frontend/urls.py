from django.urls import path
from . import views


urlpatterns = [
    path('admin/', views.index),
    path('admin/events/', views.index),
    path('admin/login/', views.index),
    path('admin/settings/', views.index),
    path('org-info/', views.index),
    path('org-logo/', views.index),
    path('org-links/', views.index)
]