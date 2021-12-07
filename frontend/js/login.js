function postLoginUser() {
    // get access to the login user form
    let loginUserForm = document.getElementById("login-user-form");
    debugger;
    if (!loginUserForm.username.checkValidity()) {
        loginUserForm.username.focus();
        alert("Username is not validated");
        return;
    } else if (!loginUserForm.password.checkValidity()) {
        loginUserForm.password.focus();
        alert("Password is not validated");
        return;
    }

    // convert the form fileds into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginUserForm)));
    // post the form data to the backend
    fetch("/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {
            alert(res)
            if (res === "login successfull") {
                window.location.href = "/";
                return;
            }
            if (res === "login failed") {
                return;
            }
            window.location.href = "/admin.html";
        })
        .catch(error => {
            console.log("user login failed - " + error);
        })
}