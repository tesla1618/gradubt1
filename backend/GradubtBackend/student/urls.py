from django.urls import path
from .views import StudentDetailView
from .models import Student

urlpatterns = [
    path('<sid>/', StudentDetailView.as_view()),
]