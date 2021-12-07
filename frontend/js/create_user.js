//// Post create user data!
function postCreateUser() {
    // Get access to the create user form
    let createUserForm = document.getElementById("create-user-form");
    
    // Client side validation check. If it's not satisfied, finsih this function.
    if (!createUserForm.firstname.checkValidity()) {
        createUserForm.firstname.focus();
        alert("Form is not completed");
        return;
    } else if (!createUserForm.lastname.checkValidity()) {
        createUserForm.lastname.focus();
        alert("Form is not completed");
        return;
    } else if (!createUserForm.email.checkValidity()) {
        createUserForm.email.focus();
        alert("Form is not completed");
        return;
    } else if (!createUserForm.username.checkValidity()) {
        createUserForm.username.focus();
        alert("Form is not completed");
        return;
    } else if (!createUserForm.password.checkValidity()) {
        createUserForm.password.focus();
        alert("Form is not completed");
        return;
    } else if (!createUserForm.accessrights.checkValidity()) {
        createUserForm.accessrights.focus();
        alert("Form is not completed");
        return;
    }

    // Convert the form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm)))
    // Post the form JSON to the backend
    fetch("/api/users/create", {
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
            console.log("Create user request sent!");
            window.location.href = "/user_list.html"
        })
        .catch(err => {
            // handle the error from the server
            console.log("Create user request failed! " + err);
        })
}