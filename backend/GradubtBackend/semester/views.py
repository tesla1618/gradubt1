from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Semester

from .serializers import SemesterSerializer
# Create your views here.

class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer

    def get_queryset(self):
        year = self.request.query_params.get('year', None)
        semester = self.request.query_params.get('semester', None)

        queryset = Semester.objects.all()

        if year:
            # Filter by year if provided
            queryset = queryset.filter(year=year)

        if semester:
            # Filter by semester name if provided
            queryset = queryset.filter(semester=semester)

        return queryset