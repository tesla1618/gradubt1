from django.urls import path
from .views import SemesterViewSet
from .models import Semester

urlpatterns = [
    path('semester/', SemesterViewSet.as_view()),
]