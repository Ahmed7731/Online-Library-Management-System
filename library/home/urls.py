from django.urls import path
from . import views

urlpatterns = [
    path('',            views.home_view,       name='home'),
    path('login/',      views.login_view,      name='login'),
    path('signup/',     views.signup_view,     name='signup'),
    path('user-home/',  views.user_home_view,  name='user_home'),
    path('admin-home/', views.admin_home_view, name='admin_home'),
    path('logout/',     views.logout_view,     name='logout'),
]