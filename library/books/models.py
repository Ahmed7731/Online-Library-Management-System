from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    title       = models.CharField(max_length=255)
    author      = models.CharField(max_length=255, blank=True)
    category    = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    count       = models.PositiveIntegerField(default=1)

    def status(self):
        return 'available' if self.count > 0 else 'unavailable'

    def __str__(self):
        return self.title


class BorrowRecord(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    book        = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField()
    returned    = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} — {self.book.title}'
