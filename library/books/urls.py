from django.urls import path
from . import views

urlpatterns = [
    # Admin pages
    path('admin-add-book/', views.admin_add_book_view, name='admin_add_book'),
    path('admin-edit-book/', views.admin_edit_book_view, name='admin_edit_book'),
    path('admin-manage/', views.admin_manage_books_view, name='admin_manage'),
    path('admin-view-books/', views.admin_view_books_view, name='admin_view_books'),

    # User pages
    path('available-books/', views.user_available_books_view, name='user_available_books'),
    path('book-details/<int:book_id>/', views.user_book_details_view, name='user_book_details'),
    path('borrow/', views.user_borrow_view, name='user_borrow'),
    path('borrowed-books/', views.user_borrowed_books_view, name='user_borrowed_books'),
    path('search/', views.user_search_view, name='user_search'),

    # API
    path('api/books/', views.api_books_list, name='api_books_list'),
    path('api/books/add/', views.api_books_add, name='api_books_add'),
    path('api/books/<int:book_id>/', views.api_book_detail, name='api_book_detail'),
    path('api/books/<int:book_id>/edit/', views.api_book_edit, name='api_book_edit'),
    path('api/books/<int:book_id>/delete/', views.api_book_delete, name='api_book_delete'),
    path('api/books/<int:book_id>/borrow/', views.api_borrow_book, name='api_borrow_book'),
    path('api/my-borrows/', views.api_my_borrows, name='api_my_borrows'),
    path('api/search/', views.api_search_books, name='api_search_books'),
]
