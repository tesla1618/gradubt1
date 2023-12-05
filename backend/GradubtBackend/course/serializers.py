from rest_framework import serializers
from .models import Course
from department.serializers import DepartmentSerializer

class CourseSerializer(serializers.ModelSerializer):
    program = DepartmentSerializer()
    class Meta:
        model = Course
        fields = ['id', 'cname' ,'ccode', 'credit', 'program']