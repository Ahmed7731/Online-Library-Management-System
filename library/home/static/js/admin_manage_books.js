function showMsg(text, type) {
    const box = document.getElementById('msg');
    box.textContent = text;
    box.className = 'msg-box ' + (type === 'success' ? 'msg-success' : 'msg-error');
    box.style.display = 'block';
    setTimeout(() => { box.style.display = 'none'; }, 4000);
}

function deleteBook(id) {
    if (!confirm('Delete this book? This cannot be undone.')) return;

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(`/api/books/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'X-CSRFToken': csrfToken }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            showMsg('Book deleted ✅', 'success');
            setTimeout(() => location.reload(), 1200);
        } else {
            showMsg('Error: ' + (data.error || 'Unknown'), 'error');
        }
    })
    .catch(() => showMsg('Something went wrong. Try again.', 'error'));
}

document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('#manageTable tbody');

    fetch('/api/books/')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = '';

            if (data.books.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#888;">No books found.</td></tr>';
                return;
            }

            data.books.forEach(book => {
                const badgeClass = book.status === 'available' ? 'badge-available' : 'badge-unavailable';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author || '—'}</td>
                    <td>${book.category || '—'}</td>
                    <td><span class="badge ${badgeClass}">${book.status}</span></td>
                    <td><button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(() => showMsg('Failed to load books.', 'error'));
});
