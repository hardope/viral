from django.urls import path

from . import views

urlpatterns = [
     # Main Views
     path('', views.feed, name="feed"),
     path('new_post', views.new_post, name="new_post"),

     # Json Views
     path('notification', views.notification, name="notification"),
     path('like/<query>', views.like, name="like"),
     path('unlike/<query>', views.unlike, name="unlike"),
     path('fetch_posts', views.fetch_posts, name="fetch_posts"),
     path('view_likes/<query>', views.view_likes, name="view_likes"),

     # Auth Views
     path('login', views.login_view, name="login"),
     path('register', views.register, name="register"),
     path('logout', views.logout_view, name="logout"),
]