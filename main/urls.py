from django.urls import path

from . import views

urlpatterns = [
     path('', views.feed, name="feed"),
     path('login', views.login_view, name="login"),
     path('register', views.register, name="register"),
     path('logout', views.logout_view, name="logout"),
]