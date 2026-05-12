document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('#borrowedTable tbody');

    fetch('/api/my-borrows/')
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = '';

            if (data.borrows.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#888;">You have no borrowed books.</td></tr>';
                return;
            }

            data.borrows.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author || '—'}</td>
                    <td>${book.category || '—'}</td>
                    <td>${book.borrow_date}</td>
                    <td>${book.return_date}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(() => {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#c0392b;">Failed to load borrowed books.</td></tr>';
        });
});
