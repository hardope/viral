from django.urls import path

from . import views

urlpatterns = [
    # Main Views
    path("", views.feed, name="feed"),
    path("new_post", views.new_post, name="new_post"),
    path("comment/<query>", views.comment, name="comment"),
    path("edit_post/<query>", views.edit_post, name="edit_post"),
    path("delete/<query>", views.delete, name="delete"),
    path("profile/<query>", views.profile, name="profile"),
    # Json Views
    path("request_code", views.request_code, name="request_code"),
    path("check_otp", views.check_otp, name="check_otp"),
    path("notification", views.notification, name="notification"),
    path("like/<query>", views.like, name="like"),
    path("unlike/<query>", views.unlike, name="unlike"),
    path("fetch_posts", views.fetch_posts, name="fetch_posts"),
    path("view_likes/<query>", views.view_likes, name="view_likes"),
    path("follow/<query>", views.follow, name="follow"),
    # Auth Views
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
]
