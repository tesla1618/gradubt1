from django.db import models
from department.models import Department

class Course(models.Model):
    cname = models.CharField(max_length=100)
    ccode = models.CharField(max_length=10, unique=True)
    credit = models.FloatField()
    program = models.ForeignKey(Department, on_delete=models.CASCADE)
    def __str__(self):
        return self.cname
