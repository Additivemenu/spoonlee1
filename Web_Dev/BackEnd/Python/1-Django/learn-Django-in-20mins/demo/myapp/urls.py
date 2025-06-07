from django.urls import path

from . import views

# this is like routes in express
urlpatterns = [
    path("", views.home, name="home"),

]