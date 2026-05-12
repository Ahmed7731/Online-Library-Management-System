document.addEventListener("DOMContentLoaded", function () {

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let table = document.getElementById("booksTable");

    books.forEach(book => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${book._id}</td>
            <td>${book.title}</td>
            <td>${book.authors}</td>
            <td>${book.categories}</td>
            <td>${book.count > 0 ? "Available" : "Borrowed"}</td>
        `;

        table.appendChild(row);
    });

});