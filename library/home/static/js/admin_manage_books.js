document.addEventListener("DOMContentLoaded", function () {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let table = document.querySelector("table");

  books.forEach((book, index) => {
    book.status = book.count > 0 ? "Available" : "Borrowed";

    let row = table.insertRow();

    row.innerHTML = `
        <td>${book._id}</td>
        <td><img alt="Book  Cover" src = "${book.thumbnailUrl}"/> </td>
        <td>${book.title}</td>
        <td>${book.authors}</td>
        <td>${book.categories}</td>
        <td>${book.status}</td>
        <td>
            <button onclick="deleteBook(${index})">delete</button>
        </td>
        `;
  });

  localStorage.setItem("books", JSON.stringify(books));
});

function deleteBook(index) {
  let permission = confirm("This process can't be undo");
  if (permission) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    location.reload();
    alert("Book deleted Sucessfully");
  }
}
