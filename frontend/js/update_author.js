let urlParameters = new URLSearchParams(window.location.search);
// Access the use ID from the query string (ie. ?id=1)
let authoId = urlParameters.get("id");
if (authoId) {
    // Get author information from server and show
    fetch(`/api/authors/${authoId}`)
        .then(res => res.json())
        .then(author => {
            if(author === "failed to find author by id"){
                alert(author);
                window.location.href="/author_list.html";
                return;
            }
            // Push existing author information into the form inputs
            document.getElementById("name").value = author.name;
            document.getElementById("surname").value = author.surname;
            document.getElementById("nationality").value = author.nationality;
            document.getElementById("birthyear").value = author.birthYear;
            document.getElementById("deathyear").value = author.deathYear;
            document.getElementById("authorId").value = author.authorID;
        })
}
//// Post back updated data!
function postUpdateAuthor() {
    // Get access to the update author form
    let updateAuthorForm = document.getElementById("update-author-form");

    // Client side validation check. If it's not satisfied, finsih this function.
    if (!updateAuthorForm.name.checkValidity()) {
        updateAuthorForm.name.focus();
        alert("Form is not completed");
        return;
    } else if (!updateAuthorForm.surname.checkValidity()) {
        updateAuthorForm.surname.focus();
        alert("Form is not completed");
        return;
    } else if (!updateAuthorForm.nationality.checkValidity()) {
        updateAuthorForm.nationality.focus();
        alert("Form is not completed");
        return;
    } else if (!updateAuthorForm.birthyear.checkValidity()) {
        updateAuthorForm.birthyear.focus();
        alert("Form is not completed");
        return;
    } else if (!updateAuthorForm.deathyear.checkValidity()) {
        updateAuthorForm.deathyear.focus();
        alert("Form is not completed");
        return;
    }

    // Convert the form data into a JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateAuthorForm)))
    // Post the JSON data to the API
    fetch("/api/authors/update", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(response => {
            alert(response);
            // Redirect back to user list
            window.location.href = "/author_list.html"
        })
}