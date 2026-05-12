document.addEventListener("DOMContentLoaded", function () {

    let borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    let table = document.getElementById("borrowedTable");

    table.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Category</th>
        <th>Borrow Date</th>
        <th>Return Date</th>
    </tr>`;

    borrowed.forEach(book => {
        table.innerHTML += `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.borrowDate}</td>
            <td>${book.returnDate}</td>
        </tr>
        `;
    });

});