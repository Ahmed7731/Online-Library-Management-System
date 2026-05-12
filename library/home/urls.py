from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('user_home/', views.user_home_view, name='user_home'),
    path('user_search/', views.user_search_view, name='user_search'),
    path('user_borrowed_books/', views.user_borrowed_books_view, name='user_borrowed_books'),
    path('user_borrow/', views.user_borrow_view, name='user_borrow_view'),
    path('user_book_details/', views.user_book_details_view, name='user_book_details'),
    path('user_available_books/', views.user_available_books_view, name='user_available_books'),
    path('admin_home/', views.admin_home_view, name='admin_home'),
    path('admin_add_book/', views.admin_add_book_view, name='admin_add_book'),

    path('admin_edit_book/', views.admin_edit_book_view, name='admin_edit_book'),

    path('admin_manage_books/', views.admin_manage_book_view, name='admin_manage_books'),

    path('admin_view_books/', views.admin_view_book_view, name='admin_view_books'),

    path('logout/', views.logout_view, name='logout'),

    path("__reload__/", include("django_browser_reload.urls")),
]
