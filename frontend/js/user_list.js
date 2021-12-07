// Get users list from server and show
fetch("/api/users")
    .then(response => response.json())
    .then(users => {
        console.log(users);

        let user_list = document.getElementById("user-list");
        for (let user of users) {

            user_list.innerHTML += `
            <tr class="user-li">
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.accessRights}</td>
                <td>
                    <a class="btn btn-secondary m-1" href="/update_user.html?id=${user.userID}">Edit</a>
                    <a class="btn">
                        <form id="delete-user-form">
                            <input type="hidden" name="userId" value="${user.userID}">
                            <input class="btn btn-secondary" type="button" value="Delete" onclick=postDeleteUser(this)>
                        </form>
                    </a>
                </td>
            </tr>
            `
        }
    })

// Send delete request to server
function postDeleteUser(el) {
    if (confirm("Are you sure?")) {
        // Convert the form data into a JSON string
        let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(el.parentNode)))
        
        // Post the JSON data to the API
        fetch("/api/users/delete", {
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
    }
}