from rest_framework import serializers
from .models import Semester
from course.models import Course
from department.serializers import DepartmentSerializer

class CourseSerializer(serializers.ModelSerializer):
    program = DepartmentSerializer()
    class Meta:
        model = Course
        fields = ['id', 'cname', 'ccode', 'credit', 'program']
        extra_kwargs = {'department': {'required': False}}

class SemesterSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)
    class Meta:
        model = Semester
        fields = ['semester', 'year', 'courses']
        extra_kwargs = {'semester': {'required': False}}

    def create(self, validated_data):
        return Semester.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.semester = validated_data.get('semester', instance.semester)
        instance.save()
        return instance