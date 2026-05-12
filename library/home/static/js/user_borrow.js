function borrowBook(bookId) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch(`/api/books/${bookId}/borrow/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            const msg = document.getElementById('msg');
            if (msg) {
                msg.textContent = 'Borrowed successfully ✅';
                msg.className = 'msg-box msg-success';
                msg.style.display = 'block';
            }
            setTimeout(() => location.reload(), 1200);
        } else {
            const msg = document.getElementById('msg');
            if (msg) {
                msg.textContent = data.error || 'Could not borrow this book.';
                msg.className = 'msg-box msg-error';
                msg.style.display = 'block';
            }
        }
    })
    .catch(() => {
        const msg = document.getElementById('msg');
        if (msg) {
            msg.textContent = 'Something went wrong. Try again.';
            msg.className = 'msg-box msg-error';
            msg.style.display = 'block';
        }
    });
}
