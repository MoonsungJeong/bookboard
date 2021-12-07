let urlParameters = new URLSearchParams(window.location.search);

// Access the use ID from the query string (ie. ?id=1)
let bookId = urlParameters.get("id");
if (bookId) {
    let book_authorId;
    // Get book information from server and show
    fetch(`/api/books/${bookId}`)
        .then(res => res.json())
        .then(book => {
            console.log(book);
            if(book === "failed to find book by id"){
                alert(book);
                window.location.href="/book_list.html";
                return;
            }
            document.getElementById("title").value = book.bookTitle;
            document.getElementById("genre").value = book.genre;
            document.getElementById("yearofpublication").value = book.yearofPublication;
            document.getElementById("millionsold").value = book.millionsSold;
            document.getElementById("languagewritten").value = book.languageWritten;
            document.getElementById("bookId").value = book.bookID;

            book_authorId = book.authorID;
        })
    // Get authors list from server to show pre-prepared select element
    fetch("api/authors")
        .then(response => response.json())
        .then(authors => {
            console.log(authors);
            let author_list = document.getElementById("author");
            for (let author of authors) {
                if (author.authorID == book_authorId) {
                    author_list.innerHTML += `
                <option selected value="${author.authorID}">${author.name}</option>
                `
                    continue;
                }
                author_list.innerHTML += `
            <option value="${author.authorID}">${author.name}</option>
            `
            }
        })
};

//// Post back updated data!
function postUpdateBook() {
    // Get access to the update book form
    let updateBookForm = document.getElementById("update-book-form");

    // Client side validation check. If it's not satisfied, finsih this function.
    if (!updateBookForm.title.checkValidity()) {
        updateBookForm.title.focus();
        alert("Form is not completed");
        return;
    } else if (updateBookForm.author.selectedIndex == 0) {
        updateBookForm.author.focus();
        alert("Form is not completed");
        return;
    } else if (!updateBookForm.genre.checkValidity()) {
        updateBookForm.genre.focus();
        alert("Form is not completed");
        return;
    } else if (!updateBookForm.yearofpublication.checkValidity()) {
        updateBookForm.yearofpublication.focus();
        alert("Form is not completed");
        return;
    } else if (!updateBookForm.millionsold.checkValidity()) {
        updateBookForm.millionsold.focus();
        alert("Form is not completed");
        return;
    } else if (!updateBookForm.languagewritten.checkValidity()) {
        updateBookForm.languagewritten.focus();
        alert("Form is not completed");
        return;
    }

    let formData = new FormData(updateBookForm);
    var fileUpload = document.getElementById('coverimagepath');
    // Attach image file to form
    formData.append('myFile', fileUpload.files[0]);

    // Post the Form data to the API
    fetch('/api/books/update', {
            method: 'POST',
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            alert(res);
            console.log("update book request sent!");
            window.location.href = "/book_list.html"
        })
        .catch(err => {
            console.log("update book request failed! " + err);
        })
};