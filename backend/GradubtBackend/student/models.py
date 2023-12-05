from django.db import models
from users.models import User
from department.models import Department
from semester.models import Semester
from django.db import connections
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
import os

def dp_path(instance, filename):
    student_name_slug = slugify(instance.first_name)
    
    _, ext = os.path.splitext(filename)
    
    new_filename = f"dp/{student_name_slug}{ext}"
    
    return new_filename

class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dp = models.ImageField(upload_to=dp_path, blank=True, null = True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    sid = models.CharField(max_length=12, unique=True, null=True, blank=True)
    last_name = models.CharField(max_length=100,  blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, blank=True, null=True)
    intake = models.IntegerField(blank=True, null=True)
    section = models.IntegerField(blank=True, null=True)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Students"

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


@receiver(post_save, sender=Student)
def create_student_folder(sender, instance, created, **kwargs):
    slugedSname = slugify(instance.first_name)
    if created:
        folder_path = os.path.join('static', 'students', slugedSname)
        os.makedirs(folder_path, exist_ok=True)