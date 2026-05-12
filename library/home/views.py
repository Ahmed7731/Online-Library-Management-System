from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache


# ── helpers ───────────────────────────────────────────────────────────────────

def _redirect_by_role(user):
    return redirect('admin_home' if user.is_staff else 'user_home')


# ── auth views ────────────────────────────────────────────────────────────────

def home_view(request):
    if request.user.is_authenticated:
        return _redirect_by_role(request.user)
    return render(request, 'index.html')


def login_view(request):
    if request.user.is_authenticated:
        return _redirect_by_role(request.user)

    errors = {}

    if request.method == 'POST':
        email    = request.POST.get('email', '').strip()
        password = request.POST.get('password', '').strip()

        if not email:
            errors['email'] = 'Email is required'
        elif '@' not in email:
            errors['email'] = 'Invalid email format'

        if not password:
            errors['password'] = 'Password is required'
        elif len(password) < 6:
            errors['password'] = 'Password must be at least 6 characters'

        if not errors:
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(request, username=user_obj.username, password=password)
                if user is not None:
                    login(request, user)
                    return _redirect_by_role(user)
                else:
                    errors['general'] = 'Invalid email or password'
            except User.DoesNotExist:
                errors['general'] = 'Invalid email or password'

    return render(request, 'login.html', {'errors': errors, 'post': request.POST})


def signup_view(request):
    if request.user.is_authenticated:
        return _redirect_by_role(request.user)

    errors = {}

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email    = request.POST.get('email', '').strip()
        password = request.POST.get('password', '').strip()
        confirm  = request.POST.get('confirm_password', '').strip()
        is_admin = request.POST.get('is_admin', '')

        if not username:
            errors['username'] = 'Username is required'
        elif User.objects.filter(username=username).exists():
            errors['username'] = 'Username already taken'

        if not email:
            errors['email'] = 'Email is required'
        elif '@' not in email:
            errors['email'] = 'Invalid email format'
        elif User.objects.filter(email=email).exists():
            errors['email'] = 'Email already registered'

        if not password:
            errors['password'] = 'Password is required'
        elif len(password) < 6:
            errors['password'] = 'Password must be at least 6 characters'

        if not confirm:
            errors['confirm_password'] = 'Please confirm your password'
        elif password != confirm:
            errors['confirm_password'] = 'Passwords do not match'

        if is_admin not in ('0', '1'):
            errors['is_admin'] = 'Please select an option'

        if not errors:
            user = User.objects.create_user(
                username=username, email=email, password=password
            )
            user.is_staff = (is_admin == '1')
            user.save()
            login(request, user)
            return _redirect_by_role(user)

    return render(request, 'signup.html', {'errors': errors, 'post': request.POST})


def logout_view(request):
    logout(request)
    return redirect('home')


# ── dashboard views ───────────────────────────────────────────────────────────

@login_required(login_url='/login/')
@never_cache
def user_home_view(request):
    if request.user.is_staff:
        return redirect('admin_home')
    return render(request, 'user_home.html', {'username': request.user.username})


@login_required(login_url='/login/')
@never_cache
def admin_home_view(request):
    if not request.user.is_staff:
        return redirect('user_home')
    return render(request, 'admin_home.html', {'username': request.user.username})


# ── error handlers ────────────────────────────────────────────────────────────

def error_400(request, exception=None):
    return render(request, '400.html', status=400)

def error_403(request, exception=None):
    return render(request, '403.html', status=403)

def error_404(request, exception=None):
    return render(request, '404.html', status=404)

def error_500(request):
    return render(request, '500.html', status=500)
