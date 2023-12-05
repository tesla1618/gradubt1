from rest_framework import serializers
from .models import User
from djoser.serializers import UserCreateSerializer
from rest_framework.fields import CurrentUserDefault


class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username',  'email',]
        extra_kwargs = {'password': {'write_only': True}}
        extra_kwargs = {'email': {'write_only': True}}

    def validate(self, data):
        if len(data.get('password')) <= 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long!")

        return data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserEditSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class UserLessInfoSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', ]
        extra_kwargs = {'password': {'write_only': True}}