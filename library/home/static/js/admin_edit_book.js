function showMsg(text, type) {
    const box = document.getElementById('msg');
    box.textContent = text;
    box.className = 'msg-box ' + (type === 'success' ? 'msg-success' : 'msg-error');
    box.style.display = 'block';
    setTimeout(() => { box.style.display = 'none'; }, 4000);
}

document.addEventListener('DOMContentLoaded', function () {

    let books = [];
    const select = document.getElementById('bookSelect');

    fetch('/api/books/')
        .then(res => res.json())
        .then(data => {
            books = data.books;
            books.forEach((book, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = book.title;
                select.appendChild(option);
            });
            loadBook();
        })
        .catch(() => showMsg('Failed to load books.', 'error'));

    function loadBook() {
        const book = books[select.value];
        if (!book) return;
        document.getElementById('bookName').value    = book.title;
        document.getElementById('author').value      = book.author;
        document.getElementById('category').value    = book.category;
        document.getElementById('description').value = book.description || '';
    }

    select.addEventListener('change', loadBook);

    document.getElementById('saveBtn').onclick = function () {
        const book = books[select.value];
        if (!book) { showMsg('Please select a book first.', 'error'); return; }

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const payload = {
            name:        document.getElementById('bookName').value.trim(),
            author:      document.getElementById('author').value.trim(),
            category:    document.getElementById('category').value.trim(),
            description: document.getElementById('description').value.trim()
        };

        fetch(`/api/books/${book.id}/edit/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                showMsg('Book updated successfully ✅', 'success');
                books[select.value] = { ...book, ...payload, title: payload.name };
            } else {
                showMsg('Error: ' + (data.error || 'Unknown'), 'error');
            }
        })
        .catch(() => showMsg('Something went wrong. Try again.', 'error'));
    };
});
