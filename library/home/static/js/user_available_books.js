document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('#availableTable tbody');

    fetch('/api/books/')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = '';

            if (data.books.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#888;">No books available.</td></tr>';
                return;
            }

            data.books.forEach(book => {
                const alreadyBorrowed = book.already_borrowed;
                const available = book.count > 0 && !alreadyBorrowed;
                const badgeClass = book.status === 'available' ? 'badge-available' : 'badge-unavailable';

                let borrowCell;
                if (alreadyBorrowed) {
                    borrowCell = `<button class="btn" disabled>Borrowed ✅</button>`;
                } else if (available) {
                    borrowCell = `<button class="btn btn-primary" onclick="borrowBook(${book.id})">Borrow</button>`;
                } else {
                    borrowCell = `<button class="btn" disabled>Unavailable</button>`;
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author || '—'}</td>
                    <td>${book.category || '—'}</td>
                    <td><span class="badge ${badgeClass}">${book.status}</span></td>
                    <td>${borrowCell}</td>
                    <td><button class="btn btn-secondary" onclick="goDetails(${book.id})">Details</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(() => {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#c0392b;">Failed to load books.</td></tr>';
        });
});

function goDetails(bookId) {
    window.location.href = `/book-details/${bookId}/`;
}
