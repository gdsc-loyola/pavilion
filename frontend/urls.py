from django.urls import path, re_path
from . import views


urlpatterns = [
    path('admin/', views.index),
    path('admin/events/', views.index),
    path('admin/login/', views.index),
    
    # Catch-all for all other URLs
    re_path(r'^admin/.*$', views.index),
    path('org-info/', views.index),
    path('org-logo/', views.index),
    path('org-links/', views.index)
]