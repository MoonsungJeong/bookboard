let urlParameters = new URLSearchParams(window.location.search);

// Access the use ID from the query string (ie. ?id=1)
let bookId = urlParameters.get("id");
// Get book information and show
if (bookId) {
    fetch(`/api/books/${bookId}`)
        .then(res => res.json())
        .then(book => {
            console.log(book);
            if(book === "failed to find book by id"){
                alert(book);
                window.location.href="/view_books.html";
                return;
            }
            document.getElementById("bookTitle").innerHTML = book.bookTitle;
            document.getElementById("authorName").innerHTML = book.authorName;
            document.getElementById("genre").innerHTML = book.genre;
            document.getElementById("yearofPublication").innerHTML = book.yearofPublication;
            document.getElementById("millionsSold").innerHTML = book.millionsSold;
            document.getElementById("languageWritten").innerHTML = book.languageWritten;
            document.getElementById("coverImagePath").src = book.coverImagePath.replaceAll('&#x2F;', '/');

        })
}