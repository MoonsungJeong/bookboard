// Get books list from server and show
fetch("api/books")
    .then(response => response.json())
    .then(books => {
        console.log(books);
        let book_list = document.getElementById("book-list");
        for (let book of books) {
            book_list.innerHTML += `
            <div class="grid-item">
                <div class="card">
                    <div class="card-img-box">
                        <img src="${book.coverImagePath}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 id="bookTitle" class="card-title">${book.bookTitle}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Author: <span id="authorName" class="fw-bold">${book.authorName}</span></li>
                            <li class="list-group-item">Genre: <span id="genre" class="fw-bold">${book.genre}</span></li>
                            <li class="list-group-item">Publication year: <span id="yearofPublication" class="fw-bold">${book.yearofPublication}</span></li>
                            <li class="list-group-item">Sold: <span id="millionSold" class="fw-bold">${book.millionsSold}</span></li>
                            <li class="list-group-item">Language: <span id="languageWritten" class="fw-bold">${book.languageWritten}</span></li>
                        </ul>
                        <a class="btn btn-secondary" href="/update_book.html?id=${book.bookID}">Edit</a>
                        <a class="btn">
                            <form id="delete-book-form">
                                <input type="hidden" name="bookId" value="${book.bookID}">
                                <input class="btn btn-secondary" type="button" value="Delete" onclick=postDeleteBook(this)>
                            </form>
                        </a>
                    </div>
                </div>
            </div>
            `
        }
    })
    
// Send delete request to server
function postDeleteBook(el) {
    if (confirm("Are you sure?")) {
        // Convert the form data into a JSON string
        let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(el.parentNode)))
        // Post the JSON data to the API

        fetch("/api/books/delete", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: formDataJSON
            })
            .then(res => res.json())
            .then(response => {
                alert(response);
                window.location.href = "/book_list.html"
            })
    }
}