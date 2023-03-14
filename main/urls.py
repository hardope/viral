from django.urls import path

from . import views

urlpatterns = [
     path('', views.feed, name="feed"),
     path('fetch_posts', views.fetch_posts, name="fetch_posts"),
     path('new_post', views.new_post, name="new_post"),
     path('notification', views.notification, name="notification"),


     path('login', views.login_view, name="login"),
     path('register', views.register, name="register"),
     path('logout', views.logout_view, name="logout"),
]