import json
from datetime import date, timedelta

from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Book, BorrowRecord


# ── helpers ───────────────────────────────────────────────────────────────────

def _require_admin(request):
    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({'error': 'Forbidden'}, status=403)
    return None


def _require_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    return None


# ── admin page views ──────────────────────────────────────────────────────────

@login_required(login_url='/login/')
def admin_add_book_view(request):
    if not request.user.is_staff:
        return redirect('user_home')
    return render(request, 'admin_add_book.html')


@login_required(login_url='/login/')
def admin_edit_book_view(request):
    if not request.user.is_staff:
        return redirect('user_home')
    return render(request, 'admin_edit_book.html')


@login_required(login_url='/login/')
def admin_manage_books_view(request):
    if not request.user.is_staff:
        return redirect('user_home')
    return render(request, 'admin_manage_books.html')


@login_required(login_url='/login/')
def admin_view_books_view(request):
    if not request.user.is_staff:
        return redirect('user_home')
    return render(request, 'admin_view_books.html')


# ── user page views ───────────────────────────────────────────────────────────

@login_required(login_url='/login/')
def user_available_books_view(request):
    return render(request, 'user_available_books.html')


@login_required(login_url='/login/')
def user_book_details_view(request, book_id):
    return render(request, 'user_book_details.html', {'book_id': book_id})


@login_required(login_url='/login/')
def user_borrow_view(request):
    return render(request, 'user_borrow.html')


@login_required(login_url='/login/')
def user_borrowed_books_view(request):
    return render(request, 'user_borrowed_books.html')


@login_required(login_url='/login/')
def user_search_view(request):
    return render(request, 'user_search.html')


# ── API: books ────────────────────────────────────────────────────────────────

@require_http_methods(['GET'])
def api_books_list(request):
    err = _require_user(request)
    if err:
        return err
    books = Book.objects.all()
    borrowed_ids = set(
        BorrowRecord.objects.filter(user=request.user, returned=False)
        .values_list('book_id', flat=True)
    )
    data = [
        {
            'id': b.id,
            'title': b.title,
            'author': b.author,
            'category': b.category,
            'description': b.description,
            'count': b.count,
            'status': b.status(),
            'already_borrowed': b.id in borrowed_ids,
        }
        for b in books
    ]
    return JsonResponse({'books': data})


@csrf_exempt
@require_http_methods(['POST'])
def api_books_add(request):
    err = _require_admin(request)
    if err:
        return err
    try:
        payload = json.loads(request.body)
        books_data = payload if isinstance(payload, list) else [payload]
        created = []
        for b in books_data:
            title = b.get('name', '').strip()
            if not title:
                return JsonResponse({'error': 'Book name is required'}, status=400)
            book = Book.objects.create(
                title=title,
                author=b.get('author', '').strip(),
                category=b.get('category', '').strip(),
                description=b.get('description', '').strip(),
                count=int(b.get('count', 1)),
            )
            created.append({'id': book.id, 'title': book.title})
        return JsonResponse({'created': created}, status=201)
    except (json.JSONDecodeError, ValueError) as exc:
        return JsonResponse({'error': str(exc)}, status=400)


@require_http_methods(['GET'])
def api_book_detail(request, book_id):
    err = _require_user(request)
    if err:
        return err
    b = get_object_or_404(Book, pk=book_id)
    borrowed = BorrowRecord.objects.filter(
        user=request.user, book=b, returned=False
    ).exists()
    return JsonResponse({
        'id': b.id, 'title': b.title, 'author': b.author,
        'category': b.category, 'description': b.description,
        'count': b.count, 'status': b.status(),
        'already_borrowed': borrowed,
    })


@csrf_exempt
@require_http_methods(['PUT'])
def api_book_edit(request, book_id):
    err = _require_admin(request)
    if err:
        return err
    b = get_object_or_404(Book, pk=book_id)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    b.title       = data.get('name', b.title).strip()
    b.author      = data.get('author', b.author).strip()
    b.category    = data.get('category', b.category).strip()
    b.description = data.get('description', b.description).strip()
    if 'count' in data:
        b.count = int(data['count'])
    b.save()
    return JsonResponse({'message': 'Updated', 'id': b.id})


@csrf_exempt
@require_http_methods(['DELETE'])
def api_book_delete(request, book_id):
    err = _require_admin(request)
    if err:
        return err
    b = get_object_or_404(Book, pk=book_id)
    b.delete()
    return JsonResponse({'message': 'Deleted'})


@csrf_exempt
@require_http_methods(['POST'])
def api_borrow_book(request, book_id):
    err = _require_user(request)
    if err:
        return err
    b = get_object_or_404(Book, pk=book_id)
    if b.count <= 0:
        return JsonResponse({'error': 'Book not available'}, status=400)
    already = BorrowRecord.objects.filter(
        user=request.user, book=b, returned=False
    ).exists()
    if already:
        return JsonResponse({'error': 'You already borrowed this book'}, status=400)
    BorrowRecord.objects.create(
        user=request.user,
        book=b,
        return_date=date.today() + timedelta(days=14),
    )
    b.count -= 1
    b.save()
    return JsonResponse({'message': 'Borrowed successfully'}, status=201)


@require_http_methods(['GET'])
def api_my_borrows(request):
    err = _require_user(request)
    if err:
        return err
    records = BorrowRecord.objects.filter(
        user=request.user, returned=False
    ).select_related('book')
    data = [
        {
            'id': r.id,
            'book_id': r.book.id,
            'title': r.book.title,
            'author': r.book.author,
            'category': r.book.category,
            'borrow_date': str(r.borrow_date),
            'return_date': str(r.return_date),
        }
        for r in records
    ]
    return JsonResponse({'borrows': data})


@require_http_methods(['GET'])
def api_search_books(request):
    err = _require_user(request)
    if err:
        return err
    q = request.GET.get('q', '').strip()
    books = Book.objects.all()
    if q:
        books = books.filter(
            Q(title__icontains=q) |
            Q(author__icontains=q) |
            Q(category__icontains=q)
        )
    borrowed_ids = set(
        BorrowRecord.objects.filter(user=request.user, returned=False)
        .values_list('book_id', flat=True)
    )
    data = [
        {
            'id': b.id, 'title': b.title, 'author': b.author,
            'category': b.category, 'count': b.count,
            'status': b.status(), 'already_borrowed': b.id in borrowed_ids,
        }
        for b in books
    ]
    return JsonResponse({'books': data})
