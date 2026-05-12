document.addEventListener("DOMContentLoaded", function () {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let select = document.getElementById("bookSelect");
  let preview = document.getElementById("thumbnailPreview");
  let imageUrl = document.getElementById("thumbnailURL");

  books.forEach((book, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = book.title;
    select.appendChild(option);
  });

  function loadBook() {
    let book = books[select.value];
    if (!book) return;

    document.getElementById("bookId").value = book._id;
    document.getElementById("bookName").value = book.title;
    document.getElementById("author").value = book.authors;
    document.getElementById("category").value = book.categories;
    imageUrl.value = book.thumbnailUrl;
    document.getElementById("description").value = book.longDescription;

    if (book.thumbnailUrl) {
      preview.src = book.thumbnailUrl;
      preview.style.display = "block";
      document.getElementById("imagePlaceHolder").style.display = "none";
    } else {
      preview.src = "";
      preview.style.display = "none";
      document.getElementById("imagePlaceHolder").style.display = "block";
    }
  }

  select.addEventListener("change", loadBook);
  loadBook();

  document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();

    // let index = select.value;
    //
    // books[index].title = document.getElementById("bookName").value;
    // books[index].authors = document.getElementById("author").value;
    // books[index].categories = document.getElementById("category").value;
    // books[index].thumbnailUrl = document.getElementById("thumbnailURL").value;
    // books[index].longDescription = document.getElementById("description").value
    // localStorage.setItem("books", JSON.stringify(books));

    alert("Updated ");
  };

  document
    .getElementById("change-image-btn")
    .addEventListener("click", function () {
      if (imageUrl.value) {
        preview.src = imageUrl.value;
        preview.style.display = "block";
        document.getElementById("imagePlaceHolder").style.display = "none";
      }
      else{
        alert("Provide a valid image Url");
      }
    });
});
