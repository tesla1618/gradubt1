from django.urls import path
from .views import DepartmentViewSet
from .models import Department

urlpatterns = [
    path('courses/', DepartmentViewSet.as_view()),
]