from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from .serializers import *
from .models import *
from django.http import JsonResponse
from django.conf import settings
import os
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
# from .validations import *
from rest_framework.filters import SearchFilter, OrderingFilter

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import generics


# Create your views here.
# views.py

class StudentProfile(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (permissions.AllowAny,)
    
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##
    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        
        # clean_data = custom_validation(request.data)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(request.data)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        clean_data = request.data
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_students(request):
    engg = list(Student.objects.using('engg').all())
    bba = list(Student.objects.using('bba').all())
    hum = list(Student.objects.using('hum').all())
    econ = list(Student.objects.using('econ').all())
    law = list(Student.objects.using('law').all())
    
    students = engg + bba + hum + econ + law
    
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

def dashbaordUsers (request):
    enggs = Student.objects.using('engg').all()
    bbas = Student.objects.using('bba').all()
    hums = Student.objects.using('hum').all()
    econs = Student.objects.using('econ').all()
    laws = Student.objects.using('law').all()
    users = [
        # enggs,
        # bbas,
        # hums,
        # econs,
        # laws,
    ]
    for queryset in [enggs, bbas, hums, econs, laws]:
        for user in queryset:
            users.append(user)
    context = {
        'enggs': enggs,
        'bbas': bbas,
        'hums': hums,
        'econs': econs,
        'laws': laws,
        'users': users,
    }
    # print()
    
    return render(request, 'users.html', context)

def badge_callback(request):
    return 3

def makeResult(request):
    print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    if request.method == 'POST':
        sid = request.POST.get('sid')
        result_value = request.POST.get('result')
        dept = request.POST.get('dept').lower()
        course_code = request.POST.get('course_code')

        print(f"Department: {dept}, SID: {sid}")
        course = Course.objects.get(ccode=course_code)
        

        result = Result.objects.create(
            sid=sid,
            course=course,
            dept=dept,
            mark=result_value,
        )
        result.save()
    else:
        print("View is executed for GET request!")

    return render(request, 'result.html')