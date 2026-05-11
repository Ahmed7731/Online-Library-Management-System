function borrowBook(index) {

    let books = JSON.parse(localStorage.getItem("books")) || [];
    let borrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    let book = books[index];

    
    if (book.count <= 0) {
        alert("Book not available ❌");
        return;
    }

    
    let exists = borrowed.some(b => b.id === book.id);
    if (exists) {
        alert("You already borrowed this book ");
        return;
    }

  
    borrowed.push({
        ...book,
        borrowDate: new Date().toLocaleDateString(),
        returnDate: new Date(Date.now() + 14 * 86400000).toLocaleDateString()
    });

    book.count--;

    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowed));

    alert("Borrowed successfully ");

    
    location.reload();
}