from django.shortcuts import render
from .serializers import StudentSerializer
from rest_framework.views import APIView
from .models import Student
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
# from users.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404



# Create your views here.

class StudentViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Student.objects.all()
        serializer = StudentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Student.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = StudentSerializer(user)
        return Response(serializer.data)

class StudentDetailView(RetrieveUpdateAPIView):
    # user = UserSerializer()
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    lookup_field = 'sid'
    lookup_url_kwarg = 'sid'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context