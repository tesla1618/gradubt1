from django.urls import path
from .views import ResultViewSet
from .models import Result

urlpatterns = [
    path('result/', ResultViewSet.as_view()),
]