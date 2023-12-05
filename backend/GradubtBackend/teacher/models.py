from django.db import models

from users.models import User
from department.models import Department
from semester.models import Semester
from django.db import connections
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
import os

def tdp_path(instance, filename):
    _, ext = os.path.splitext(filename)
    new_filename = f"dp/{instance.fcode}{ext}"
    return new_filename

class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tname = models.CharField(max_length=100, null=True, blank=True)
    tdp = models.ImageField(upload_to=tdp_path, blank=True, null = True)
    fcode = models.CharField(max_length=11, unique=True)
    dept = models.ForeignKey(Department, on_delete=models.CASCADE, blank=True, null=True)
    designation = models.CharField(max_length=50, null=True, blank=True)
    def __str__(self):
        return self.tname

@receiver(post_save, sender=Teacher)
def create_faculty_folder(sender, instance, created, **kwargs):
    if created:
        folder_path = os.path.join('static', 'teachers', instance.fcode)
        os.makedirs(folder_path, exist_ok=True)
