from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from .serializers import CourseSerializer

# Create your views here.

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        department_id = self.request.query_params.get('department', None)
        if department_id:
            # Filter courses based on the provided department_id
            return Course.objects.filter(department__id=department)
        else:
            # Return all courses if no department_id is provided
            return Course.objects.all()