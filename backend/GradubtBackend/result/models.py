from django.db import models
from users.models import User
from course.models import Course
from semester.models import Semester
from teacher.models import Teacher
from department.models import Department
from student.models import Student

class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=True, null=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    mark = models.FloatField(blank=True, null=True)
    grade = models.CharField(max_length=100, blank=True, null=True)
    gpa = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f'{self.student} {self.course} {self.semester} {self.teacher}'

    def save(self, *args, **kwargs):
        if self.mark is not None:
            if self.mark >= 80:
                self.grade = 'A+'
                self.gpa = 4.0
            elif 75 <= self.mark < 80:
                self.grade = 'A'
                self.gpa = 3.75
            elif 70 <= self.mark < 75:
                self.grade = 'A-'
                self.gpa = 3.50
            elif 65 <= self.mark < 70:
                self.grade = 'B+'
                self.gpa = 3.25
            elif 60 <= self.mark < 65:
                self.grade = 'B'
                self.gpa = 3.00
            elif 55 <= self.mark < 60:
                self.grade = 'B-'
                self.gpa = 2.75
            elif 50 <= self.mark < 55:
                self.grade = 'C+'
                self.gpa = 2.50
            elif 45 <= self.mark < 50:
                self.grade = 'C'
                self.gpa = 2.25
            elif 40 <= self.mark < 45:
                self.grade = 'D'
                self.gpa = 2.00
            else:
                self.grade = 'F'
                self.gpa = 0.00
        else:
            self.grade = None

        super().save(*args, **kwargs)
