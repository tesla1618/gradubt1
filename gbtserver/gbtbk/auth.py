from django.contrib.auth.backends import ModelBackend
from django.db import connections
from .models import UserAccount  # Adjust this import based on your actual model

class CustomBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        connections = settings.DATABASES
        for db_alias in connections:
            with connections[db_alias].cursor():
                try:
                    user = UserAccount.objects.using(db_alias).get(email=email)
                    if user.check_password(password):
                        return user
                except UserAccount.DoesNotExist:
                    pass

        return None

from django.contrib.auth import get_user_model
from django.db import connections
from rest_framework_jwt.authentication import BaseJSONWebTokenAuthentication

User = get_user_model()

class JWTAuthenticationClass(BaseJSONWebTokenAuthentication):
    def authenticate_credentials(self, payload):
        email = payload['email']  # Adjust this based on your token payload
        user = CustomBackend().authenticate(None, email=email)

        if user:
            return user, None
        else:
            return None, 'Invalid signature.'
