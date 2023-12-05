from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Result

from .serializers import ResultSerializer

class ResultViewSet(viewsets.ModelViewSet):
    # queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username', None)
        if username:
            # Filter results based on the provided username
            return Result.objects.filter(student__user__username=username)
        else:
            # Return all results if no username is provided
            return Result.objects.all()