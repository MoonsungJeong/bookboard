//// Post create author data!
function postCreateAuthor() {
    // Get access to the create user form
    let createAuthorForm = document.getElementById("create-author-form");
    
    // Client side validation check. If it's not satisfied, finsih this function.
    if (!createAuthorForm.name.checkValidity()) {
        createAuthorForm.name.focus();
        alert("Form is not completed");
        return;
    } else if (!createAuthorForm.surname.checkValidity()) {
        createAuthorForm.surname.focus();
        alert("Form is not completed");
        return;
    } else if (!createAuthorForm.nationality.checkValidity()) {
        createAuthorForm.nationality.focus();
        alert("Form is not completed");
        return;
    } else if (!createAuthorForm.birthyear.checkValidity()) {
        createAuthorForm.birthyear.focus();
        alert("Form is not completed");
        return;
    } else if (!createAuthorForm.deathyear.checkValidity()) {
        createAuthorForm.deathyear.focus();
        alert("Form is not completed");
        return;
    }

    // Convert the form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createAuthorForm)));
    // Post the form JSON to the backend
    fetch("/api/authors/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {
            // Handle the response from the server
            alert(res);
            console.log("Create author request sent!");
            window.location.href = "/author_list.html"
        })
        .catch(err => {
            // handle the error from the server
            console.log("Create author request failed! " + err);
        })

}