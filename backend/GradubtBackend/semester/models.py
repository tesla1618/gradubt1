from django.db import models
from course.models import Course


class Semester(models.Model):
    semester = models.CharField(max_length=100, unique=True)
    year = models.IntegerField(blank=True, null=True)
    courses = models.ManyToManyField(Course, related_name='semesters', blank=True)

    class Meta:
        ordering = ['-semester']
        verbose_name_plural = "Semesters"

    def __str__(self):
        return f'{self.semester} {self.year}'