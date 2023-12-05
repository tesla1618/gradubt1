from rest_framework import serializers
from .models import Student
from rest_framework.response import Response
from users.serializers import UserSerializer
from department.serializers import DepartmentSerializer
from semester.serializers import SemesterSerializer


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['__all__']
        extra_kwargs = {'dp': {'required': False}}

    def create(self, validated_data):
        return Student.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.sid = validated_data.get('sid', instance.sid)
        instance.email = validated_data.get(
            'email', instance.email)
        instance.dp = validated_data.get(
            'dp', instance.dp)
        instance.department = validated_data.get(
            'department', instance.department)
        instance.intake = validated_data.get(
            'intake', instance.intake)
        instance.section = validated_data.get(
            'section', instance.section)
        instance.semester = validated_data.get('semester', instance.semester)
        instance.save()
        return instance


class StudentViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['__all__']
        extra_kwargs = {'dp': {'required': False}}


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    department = DepartmentSerializer()
    semester = SemesterSerializer()
    class Meta:
        model = Student
        fields = ['user', 'dp', 'first_name', 'last_name', 'sid', 'email', 'department', 'intake', 'section', 'semester']
        extra_kwargs = {'dp': {'required': False}}
        



    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance