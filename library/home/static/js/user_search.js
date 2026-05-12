document.addEventListener("DOMContentLoaded", function () {

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    let table = document.getElementById("searchTable");

    function display(data) {

        data.forEach((book, index) => {

            let alreadyBorrowed = borrowed.some(b => b.id === book.id);
            let available = book.count > 0 && !alreadyBorrowed;

            table.innerHTML += `
            <tr>
            <td> </td>
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
            </tr>
            `;
        });
    }

    display(books);

    document.getElementById("searchForm").onsubmit = function (e) {
        e.preventDefault();

        let value = document.getElementById("searchInput").value.toLowerCase();

        let filtered = books.filter(b =>
            (b.title||"").toLowerCase().includes(value) ||
            (b.authors||"").toLowerCase().includes(value) ||
            (b.categories||"").toLowerCase().includes(value)
        );

        display(filtered);
    };

});