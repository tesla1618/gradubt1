from django.contrib import admin
from django.urls import path, include
from .views import *
urlpatterns = [
    
    path('view/users', dashbaordUsers, name='dashboardUsers'),
    path('api/register/', UserRegister.as_view(), name='register'),
    path('api/students/', get_students, name='getStudents'),
    path('add/result', makeResult, name='addResult'),
    path('api/student/', StudentProfile.as_view(), name='student-list-create'),

]