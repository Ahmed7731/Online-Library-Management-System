from django.contrib import admin
from django.urls import path, include

# Custom error handlers
handler400 = 'home.views.error_400'
handler403 = 'home.views.error_403'
handler404 = 'home.views.error_404'
handler500 = 'home.views.error_500'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('', include('books.urls')),
]
