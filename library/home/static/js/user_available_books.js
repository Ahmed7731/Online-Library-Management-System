document.addEventListener("DOMContentLoaded", function () {

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    let table = document.querySelector("table");

    table.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Author</th>
        <th>Category</th>
        <th>Status</th>
        <th>Borrow</th>
        <th>Details</th>
    </tr>`;

    books.forEach((book, index) => {

        let alreadyBorrowed = borrowed.some(b => b._id === book._id);
        let available = book.count > 0 && !alreadyBorrowed;

        table.innerHTML += `
        <tr>
            <td>${book._id}</td>
            <td>${book.title}</td>
            <td>${book.authors}</td>
            <td>${book.categories}</td>
            <td>${book.count > 0 ? "Available" : "Not Available"}</td>

            <td>
                ${
                    alreadyBorrowed
                    ? `<button disabled>Borrowed </button>`
                    : available
                    ? `<button onclick="borrowBook(${index})">Borrow</button>`
                    : `<button disabled>Not Available</button>`
                }
            </td>

            <td>
                <button onclick="goDetails(${book._id})">Details</button>
            </td>
        </tr>
        `;
    });

});

function goDetails(id) {
    window.location.href = `user_book_details.html?BookId=${id}`;
}