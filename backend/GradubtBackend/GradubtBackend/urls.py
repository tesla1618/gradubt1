from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from users.views import UserViewSet
from student.views import StudentViewSet
from result.views import ResultViewSet
from course.views import CourseViewSet
from semester.views import SemesterViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'results', ResultViewSet, basename='result')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'semesters', SemesterViewSet, basename='semester')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/',  include('djoser.urls.jwt')),
    path('student/', include('student.urls')),
    path('user/', include('users.urls')),
    path('', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)