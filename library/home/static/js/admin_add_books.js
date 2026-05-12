function showMsg(text, type) {
    const box = document.getElementById('msg');
    box.textContent = text;
    box.className = 'msg-box ' + (type === 'success' ? 'msg-success' : 'msg-error');
    box.style.display = 'block';
    setTimeout(() => { box.style.display = 'none'; }, 4000);
}

window.onload = function () {

    document.getElementById('add_book').onclick = function () {
        const tbody = document.querySelector('#submit_table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" placeholder="Book Name"></td>
            <td><input type="text" placeholder="Author"></td>
            <td><input type="text" placeholder="Category"></td>
            <td><input type="number" placeholder="Count" value="1" min="1"></td>
            <td><input type="text" placeholder="Description"></td>
            <td><button type="button" class="btn btn-danger delete">✕</button></td>
        `;
        tbody.appendChild(row);
    };

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const rows = document.querySelectorAll('#submit_table tbody tr');
            if (rows.length > 1) {
                e.target.closest('tr').remove();
            } else {
                showMsg('At least one row is required.', 'error');
            }
        }
    });

    document.getElementById('submit_all_button').onclick = function () {
        const rows = document.querySelectorAll('#submit_table tbody tr');
        const books = [];
        let valid = true;

        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const name = inputs[0].value.trim();
            if (!name) {
                showMsg('Book Name is required for all rows.', 'error');
                valid = false;
                return;
            }
            books.push({
                name:        name,
                author:      inputs[1].value.trim(),
                category:    inputs[2].value.trim(),
                count:       parseInt(inputs[3].value) || 1,
                description: inputs[4].value.trim()
            });
        });

        if (!valid || books.length === 0) return;

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch('/api/books/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
            body: JSON.stringify(books)
        })
        .then(res => res.json())
        .then(data => {
            if (data.created) {
                showMsg('Books added successfully ✅', 'success');
                setTimeout(() => location.reload(), 1500);
            } else {
                showMsg('Error: ' + (data.error || 'Unknown error'), 'error');
            }
        })
        .catch(() => showMsg('Something went wrong. Try again.', 'error'));
    };
};
