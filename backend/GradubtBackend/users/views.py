from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.views import APIView
from .models import User
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404



# Create your views here.


class UserViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserDetailView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = 'id'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
