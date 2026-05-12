document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('#searchTable tbody');

    function display(books) {
        tbody.innerHTML = '';

        if (books.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#888;">No books found.</td></tr>';
            return;
        }

        books.forEach(book => {
            const alreadyBorrowed = book.already_borrowed;
            const available = book.count > 0 && !alreadyBorrowed;
            const badgeClass = book.status === 'available' ? 'badge-available' : 'badge-unavailable';

            let actionCell;
            if (alreadyBorrowed) {
                actionCell = `<button class="btn" disabled>Borrowed ✅</button>`;
            } else if (available) {
                actionCell = `<button class="btn btn-primary" onclick="borrowBook(${book.id})">Borrow</button>`;
            } else {
                actionCell = `<button class="btn" disabled>Unavailable</button>`;
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author || '—'}</td>
                <td>${book.category || '—'}</td>
                <td><span class="badge ${badgeClass}">${book.status}</span></td>
                <td>${actionCell}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Load all books on page load
    fetch('/api/books/')
        .then(res => res.json())
        .then(data => display(data.books))
        .catch(() => {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#c0392b;">Failed to load books.</td></tr>';
        });

    // Search button
    document.getElementById('searchBtn').onclick = function () {
        const value = document.getElementById('searchInput').value.trim();
        fetch(`/api/search/?q=${encodeURIComponent(value)}`)
            .then(res => res.json())
            .then(data => display(data.books))
            .catch(() => {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#c0392b;">Search failed.</td></tr>';
            });
    };

    // Also search on Enter key
    document.getElementById('searchInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') document.getElementById('searchBtn').click();
    });
});
