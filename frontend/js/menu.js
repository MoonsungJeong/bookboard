// Get user accessRights information from server to set up nav-menu
fetch("/api/users/check", {
        method: "POST",
        headers: {
            'Content-Type': "text/plain"
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // Get access to the nav-menu element
        let nav_menu = document.getElementById("nav-menu");
        if (res == 'user') {
            // If user accessRights is 'user'
            nav_menu.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Book</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/view_books.html">View Book</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" href="#" onclick="postLogoutUser()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
        `
        } else if (res == 'admin') {
            // If user accessRights is 'admin'
            nav_menu.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="/admin.html">Book</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/author_list.html">Author</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/book_list.html">Book</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/user_list.html">User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/log_list.html">Log</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/view_books.html">View Book</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" href="#" onclick="postLogoutUser()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
        `
        } else {
            // If user is 'guest'
            nav_menu.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Book</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" aria-current="page" href="/view_books.html">View Book</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link p-2 mx-2 my-1 b-color-2" href="/login.html">Login</a>
                    </li>
                </ul>
            </div>
        </div>
        `
        }
    })

// Set up footer 
let footer = document.getElementById("footer");
footer.innerHTML = `
    <div class="col-md-4 d-flex align-items-center">
        <span class="text-muted">&copy; 2021 Book Library, Inc</span>
    </div>
`