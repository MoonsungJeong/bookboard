// Get authors list from server to show pre-prepared select element
fetch("api/authors")
    .then(response => response.json())
    .then(authors => {
        console.log(authors);
        let author_list = document.getElementById("author");
        for (let author of authors) {
            author_list.innerHTML += `
            <option value="${author.authorID}">${author.name}</option>
            `
        }
    })

//// Post create book data!
function postCreateBook() {
    let createBookForm = document.getElementById("create-book-form");
    
    // Client side validation check. If it's not satisfied, finsih this function.
    if (!createBookForm.title.checkValidity()) {
        createBookForm.title.focus();
        alert("Form is not completed");
        return;
    } else if (createBookForm.author.selectedIndex == 0) {
        createBookForm.author.focus();
        alert("Form is not completed");
        return;
    } else if (!createBookForm.genre.checkValidity()) {
        createBookForm.genre.focus();
        alert("Form is not completed");
        return;
    } else if (!createBookForm.yearofpublication.checkValidity()) {
        createBookForm.yearofpublication.focus();
        alert("Form is not completed");
        return;
    } else if (!createBookForm.millionsold.checkValidity()) {
        createBookForm.millionsold.focus();
        alert("Form is not completed");
        return;
    } else if (!createBookForm.languagewritten.checkValidity()) {
        createBookForm.languagewritten.focus();
        alert("Form is not completed");
        return;
    }

    let formData = new FormData(createBookForm);
    var fileUpload = document.getElementById('coverimagepath');
    // Attach file to form
    formData.append('myFile', fileUpload.files[0]);
    console.log(formData);
    
    // Post the Form data to the API
    fetch('/api/books/create', {
            method: 'POST',
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            alert(res);
            console.log("Create book request sent!");
            window.location.href = "/book_list.html"
        })
        .catch(err => {
            console.log("Create book request failed! " + err);
        })
}
