document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('#booksTable tbody');

    fetch('/api/books/')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = '';

            if (data.books.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#888;">No books in the library.</td></tr>';
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
                    <td>${book.count}</td>
                    <td><span class="badge ${badgeClass}">${book.status}</span></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(() => {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#c0392b;">Failed to load books.</td></tr>';
        });
});
