let urlParameters = new URLSearchParams(window.location.search);
// Access the use ID from the query string (ie. ?id=1)
let userId = urlParameters.get("id");
if (userId) {
    // Get user information from server and show
    fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            console.log(user);
            if(user === "failed to find user by id"){
                alert(user);
                window.location.href="/user_list.html";
                return;
            }
            // Push existing user information into the form inputs
            document.getElementById("userId").value = user.userID;
            document.getElementById("firstname").value = user.firstName;
            document.getElementById("lastname").value = user.lastName;
            document.getElementById("email").value = user.email;
            document.getElementById("username").value = user.username;
            document.getElementById("password").value = user.password;
            document.getElementById("accessrights").value = user.accessRights;
        })
};

//// Post back updated data!
function postUpdateUser() {
    // Get access to the update user form
    let updateUserForm = document.getElementById("update-user-form");

    // Client side validation check. If it's not satisfied, finsih this function.
    if (!updateUserForm.firstname.checkValidity()) {
        updateUserForm.firstname.focus();
        alert("Form is not completed");
        return;
    } else if (!updateUserForm.lastname.checkValidity()) {
        updateUserForm.lastname.focus();
        alert("Form is not completed");
        return;
    } else if (!updateUserForm.email.checkValidity()) {
        updateUserForm.email.focus();
        alert("Form is not completed");
        return;
    } else if (!updateUserForm.username.checkValidity()) {
        updateUserForm.username.focus();
        alert("Form is not completed");
        return;
    } else if (!updateUserForm.password.checkValidity()) {
        updateUserForm.password.focus();
        alert("Form is not completed");
        return;
    } else if (!updateUserForm.accessrights.checkValidity()) {
        updateUserForm.accessrights.focus();
        alert("Form is not completed");
        return;
    }

    // Convert the form data into a JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)))
    // Post the form JSON data to the API
    fetch("/api/users/update", {
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
            window.location.href = "/user_list.html"
        })
        .catch(err => {
            console.log("update user request failed! " + err);
        })
}