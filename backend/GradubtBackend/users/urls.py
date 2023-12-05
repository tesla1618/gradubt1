from django.urls import path
from .views import *
from .models import User

urlpatterns = [
    path('<id>/', UserDetailView.as_view()),
]