// Get authors list from server and show
fetch("/api/authors")
    .then(response => response.json())
    .then(authors => {
        console.log(authors);

        let author_list = document.getElementById("author-list");
        for (let author of authors) {
            if (author.deathYear == null) {
                author.deathYear = "Alive"
            }

            author_list.innerHTML += `
            <tr class="author-li">
                <td>${author.name}</td>
                <td>${author.surname}</td>
                <td>${author.nationality}</td>
                <td>${author.birthYear}</td>
                <td>${author.deathYear}</td>
                <td>
                    <a class="btn btn-secondary m-1" href="/update_author.html?id=${author.authorID}">Edit</a>
                    <a class="btn">
                        <form id="delete-author-form">
                            <input type="hidden" name="authorId" value="${author.authorID}">
                            <input class="btn btn-secondary" type="button" value="Delete" onclick=postDeleteAuthor(this)>
                        </form>
                    </a>
                </td>
            </tr>
            `
        }
    })

// Send delete request to server
function postDeleteAuthor(el) {
    if (confirm("Are you sure?")) {
        // Convert the form data into a JSON string
        let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(el.parentNode)))
        // Post the JSON data to the API

        fetch("/api/authors/delete", {
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
}