from .models import Result
from rest_framework import serializers

from student.serializers import StudentSerializer
# from teacher.serializers import TeacherSerializer
from course.serializers import CourseSerializer
from semester.serializers import SemesterSerializer

class ResultSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    # teacher = TeacherSerializer()
    course = CourseSerializer()
    semester = SemesterSerializer()
    class Meta:
        model = Result
        fields = '__all__'
