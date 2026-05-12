document.addEventListener("DOMContentLoaded", function () {
  let books = JSON.parse(localStorage.getItem("books")) || [];

const params = new URLSearchParams(window.location.search);

const id = params.get('BookId'); 

  if (id === null || !books[id]) {
    document.body.innerHTML = "<h2>No Book Selected</h2>";
    return;
  }

  let book = books[id];

  document.getElementById("title").innerText = book.title;
  document.getElementById("bAuthor").innerText = book.authors;
  document.getElementById("bCategory").innerText = book.categories;
  document.getElementById("bStatus").innerText = book.status;
  document.getElementById("bDesc").innerText = book.longDescription;
  document.getElementById("cover").src = book.thumbnailUrl;

  document.getElementById("borrowBtn").onclick = function () {
    borrowBook(id);
    window.location.href = "user_borrowed_books.html";
  };
});
