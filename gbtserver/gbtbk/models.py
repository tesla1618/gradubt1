from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import connections
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
# class User(AbstractUser):
#     is_student = models.BooleanField(default=True)
#     is_teacher = models.BooleanField(default=False)
   

#     def save_in_all_databases(self):
#         # Save the user in all databases
#         for db in connections:
#             if db != 'default':
#                 GBTUser.objects.using(db).create(
                   
#                     is_student=self.is_student,
#                     is_teacher=self.is_teacher,
                    
#                 )
#                 # Set the password correctly
#                 # user_in_db = GBTUser.objects.using(db).get(username=self.username)
#                 # user_in_db.set_password(self.password)
#                 user_in_db.save()

#     def save(self, *args, **kwargs):
#         # Override the save method to handle the default database
#         super().save(*args, **kwargs)
#         # After saving in the default database, save in all other databases
#         self.save_in_all_databases()




class UserAccountManager(BaseUserManager):

    def create_user(self, email, name, sid, dept, is_student, is_teacher, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not name:
            raise ValueError("User must have a name")

        email = self.normalize_email(email)
        dept = dept.lower()

        user = self.model(email=email, name=name, sid=sid, dept=dept, is_student=is_student, is_teacher=is_teacher)

        user.set_password(password)
        user.save()

        return user
    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

    
        user.is_superuser = True
        user.is_staff = True
        

        user.save()
        
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    sid = models.CharField(max_length=11, unique=True, blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    is_student = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'sid', 'dept', 'is_student', 'is_teacher']
    
    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name
    def __str__(self):
        return self.name

####        students/rajieb/
####        teachers/aag/

def dp_path(instance, filename):
    # Generate a slug from the event name
    student_name_slug = slugify(instance.sname)
    
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    
    # Construct the new filename using the event name slug and file extension
    new_filename = f"dp/{student_name_slug}{ext}"
    
    return new_filename

class Student(models.Model):
    sname = models.CharField(max_length=100, null = True, blank=True)
    sid = models.CharField(max_length=11, unique=True)
    intake = models.IntegerField(null = True, blank=True)
    section = models.IntegerField(null = True, blank=True)
    dept = models.CharField(max_length=10, null = True, blank=True)
    session = models.CharField(max_length=10, null = True, blank=True)
    dp = models.ImageField(upload_to=dp_path, blank=True, null = True)
    #   /static/dp/rajieb.jpg
    def __str__(self):
        return self.sname

@receiver(post_save, sender=Student)
def create_student_folder(sender, instance, created, **kwargs):
    slugedSname = slugify(instance.sname)
    if created:
        folder_path = os.path.join('static', 'students', slugedSname)
        os.makedirs(folder_path, exist_ok=True)


def tdp_path(instance, filename):
    # Generate a slug from the event name

    
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    
    # Construct the new filename using the event name slug and file extension
    new_filename = f"dp/{instance.fcode}{ext}"
    
    return new_filename

class Teacher(models.Model):
    # user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    tname = models.CharField(max_length=100, null=True, blank=True)
    tdp = models.ImageField(upload_to=tdp_path, blank=True, null = True)
    fcode = models.CharField(max_length=11, unique=True)
    dept = models.CharField(max_length=10, null=True, blank=True)
    designation = models.CharField(max_length=50, null=True, blank=True)
    def __str__(self):
        return self.tname

@receiver(post_save, sender=Teacher)
def create_faculty_folder(sender, instance, created, **kwargs):
    if created:
        folder_path = os.path.join('static', 'teachers', instance.fcode)
        os.makedirs(folder_path, exist_ok=True)

class Course(models.Model):
    cname = models.CharField(max_length=100)
    ccode = models.CharField(max_length=10, unique=True)
    credit = models.FloatField()
    def __str__(self):
        return self.cname

class Group(models.Model):
    gname = models.CharField(max_length=100)
    gcode = models.CharField(max_length=50, unique=True)
    course = models.ManyToManyField(Course)
    def __str__(self):
        return self.gname

class Result(models.Model):
    # student = models.ForeignKey(Student, on_delete=models.CASCADE)
    sid = models.CharField(max_length=11, null= True, blank=True)
    dept = models.CharField(max_length=10, null= True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    mark = models.FloatField()
    def __str__(self):
        return self.sid + " = " + self.course.cname