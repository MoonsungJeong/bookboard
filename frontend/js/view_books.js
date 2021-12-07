// Get books list from server and show
fetch("/api/books")
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
                        <h5 class="card-title fw-bold">${book.bookTitle}</h5>
                        <p class="card-text m-0">
                            <div><span class="fw-bold">[${book.genre}]</span></div>
                        </p>
                        <a href="/book.html?id=${book.bookID}" class="btn btn-primary">See book</a>
                    </div>
                </div>
            </div>
            `
        }
    })