document.addEventListener('DOMContentLoaded', function () {

    if (typeof bookId === 'undefined') {
        document.querySelector('.book-detail-card').innerHTML = '<h2>No book selected.</h2>';
        return;
    }

    fetch(`/api/books/${bookId}/`)
        .then(res => {
            if (!res.ok) throw new Error('Not found');
            return res.json();
        })
        .then(book => {
            document.getElementById('title').textContent     = book.title;
            document.getElementById('bAuthor').textContent   = book.author || '—';
            document.getElementById('bCategory').textContent = book.category || '—';
            document.getElementById('bDesc').textContent     = book.description || '—';

            const statusEl = document.getElementById('bStatus');
            const badgeClass = book.status === 'available' ? 'badge-available' : 'badge-unavailable';
            statusEl.innerHTML = `<span class="badge ${badgeClass}">${book.status}</span>`;

            const borrowBtn = document.getElementById('borrowBtn');
            if (book.already_borrowed) {
                borrowBtn.disabled = true;
                borrowBtn.textContent = 'Already Borrowed ✅';
            } else if (book.count <= 0) {
                borrowBtn.disabled = true;
                borrowBtn.textContent = 'Not Available';
            } else {
                borrowBtn.onclick = function () { borrowBook(book.id); };
            }
        })
        .catch(() => {
            document.querySelector('.book-detail-card').innerHTML = '<h2 style="color:#c0392b;">Book not found.</h2>';
        });
});
