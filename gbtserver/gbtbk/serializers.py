from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, authenticate
from djoser.serializers import UserCreateSerializer, UserSerializer

UserModel = get_user_model()


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserModel
        # fields = ('id', 'email', 'name', 'password', 'sid', 'dept', 'is_student', 'is_teacher')
        fields = '__all__'
        # extra_kwargs = {'password': {'write_only': True}}

from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
        print(validated_data)
        print("||||||||||||||||||||||||||||||||||||||||||||||||||||||||")
        
        # Create the user object
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name'),
            sid=validated_data.get('sid'),
            dept=validated_data.get('dept'),
            is_student=validated_data.get('is_student'),
            is_teacher=validated_data.get('is_teacher'),
        )
        user_obj.save(using='default')
        
        return user_obj
