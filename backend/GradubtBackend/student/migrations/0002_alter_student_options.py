# Generated by Django 4.2.7 on 2023-12-04 20:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='student',
            options={'ordering': ['-created_at'], 'verbose_name_plural': 'Students'},
        ),
    ]
