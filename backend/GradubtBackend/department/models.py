from django.db import models


class Department(models.Model):
    department = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['-department']
        verbose_name_plural = "Departments"

    def __str__(self):
        return f'{self.department}'
