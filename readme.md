# Book Board
This is 2nd web board project with **Node.js**.

### New Features - compare to previous project (Node_webboard)
* MVC Framework
* Bootstrap
* Image file upload
* Proper form validation check
* Access control middleware
* Database delete flag

## Summary
---
1. How to set up
2. Project Plan

---
### 1. How to set up
#### 1-1. File list to set up

* server.js
* books.sql

#### 1-2. Process to set up
##### ①. "npm install" to install modules into node_modules
##### ②. Check port number in "server.js" line 8
##### ③. Use SQL in "books.sql" to set up database structure and insert example data into database (IP adress is "localhost" or "127.0.0.1")

#### 1-3. Login information (default)
|  |  |  |
|--|--|--|
|Role|Username|Password|
|Admin|cat|Passw0rd|
|User|dog|Passw0rd123|

---
### 2. Project Plan
#### 2-1. Service Definition
* Guest and User (authorized) can see books list and detail information of each book
* Admin only create,edit and delete user accounts, book information and author information. (Guest cannot register themselves)

#### 2-2. Functional Feature
* Login/authentication
* Password hashing
* Displaying books information existing in the database
* Admin page
* CRUD 'author', 'books', 'user'
* Validation check in both (client and server) side (Form input validation check and input sanitizing before insert into the database)
* Log system tracking the admin that updates the books

#### 2-3. Minimum Visual Product
 * Login
 * Logout
 * View books
 * book
 * CRUD (author,book,user)
 * Log

#### 2-4. Technology and Modules
HTML, CSS, JavaScript, NodeJS, Mysql

express, express-session, bcrypt, validator, express-fileupload, body-parser, mysql2

#### 2-5. Project Detail Design (Page, Server, Database)
* Front Page List
    - Index (main)
    - Login
    - View books
    - View book/n
    - Admin page
    - Author list
    - create author
    - update author
    - delete author
    - Book list
    - create book
    - update book
    - delete book
    - User list
    - create user
    - update user
    - delete user

* Server Function
    - Login (session)
    - Logout
    - Validation (input sanitize)
    - CRUB (author, book, user)
    - Log

* Database
    - Books
    - Author
    - User
    - Log

#### 2-6. API (Model, View, Control)
* View

        / [get]                         : read "main" page
        /login.html [get]               : read "login" page
        /view_books.html [get]          : read "view books" page
        /book.html?id=ID [get]          : read "book" page
        /admin.html [get]               : read "admin" page
        /author_list.html [get]         : read "author list" page
        /book_list.html [get]           : read "book list" page
        /user_list.html [get]           : read "user list" page
        /create_author.html [get]       : read "create author" page
        /create_book.html [get]         : read "create book" page
        /create_user.html [get]         : read "create user" page
        /update_author.html?id=ID [get] : read "update author" page
        /update_book.html?id=ID [get]   : read "update book" page
        /update_user.html?id=ID [get]   : read "update user" page

* Control

        /api/users [get]                : shows existing users
        /api/users/:ID [get]            : shows existing user with ID 
        /api/users/create [post]        : creates new user
        /api/users/update [post]        : updates an existing user
        /api/users/delete [post]        : deletes an existing user
        /api/users/login [post]         : login process
        /api/users/logout [post]        : logout process
        /api/users/check [post]         : checks user's accessRights
        
        /api/books [get]                : shows existing books
        /api/books/:ID [get]            : shows existing book with ID
        /api/books/create [post]        : creates new book
        /api/books/update [post]        : updates an existing book
        /api/books/delete [post]        : deletes an existing book
        
        /api/authors [get]              : shows existing authors
        /api/authors/:ID [get]          : shows existing author with ID
        /api/authors/create [post]      : creates new author
        /api/authors/update [post]      : updates an existing author
        /api/authors/delete [post]      : deletes an existing author

        /api/logs [get]                 : show existing logs

* Model [userModel: uM, bookModel: bM, authorModel: aM, logModel: lM]

        uM.getAllUsers          : get All users 
        uM.getUserById          : get user with ID
        uM.getUserByUsername    : get user with username
        uM.createUser           : request create user
        uM.updateUser           : request update user
        uM.deleteUser           : request delete user
        
        bM.getAllBooks          : get All books 
        bM.getBookById          : get book with ID
        bM.createBook           : request create book
        bM.updateBook           : request update book
        bM.updateBookNoImage    : request update book without coverImage
        bm.deleteBook           : request delete book

        aM.getAllAuthors        : get All authors
        aM.getAuthorById        : get author with ID
        aM.createAuthor         : request create author
        aM.createAuthorNull     : request create author without deathYear
        aM.updateAuthor         : request update author 
        aM.updateAuthorNull     : request update author without deathYear
        aM.deleteAuthor         : request delete author

        lM.getAllLogs           : get All logs
        lM.createFirstLog       : request create First log
        lM.createAfterLog       : request create log after First log
        lM.getCreatedDateOfLogByBookId : get createdDate of Log of book 


#### 2-7. Database Tables
|Users|   |   |   |   |   |
|-- |------------|--------------|---------------|-----|-----|
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|Opt  |
| P |User ID     |userID        |INT(10)        |N.N  |A.I  |
|   |First Name  |firstName     |Varchar(200)   |N.N  |     |
|   |Last Name   |lastName      |Varchar(200)   |N.N  |     |
|   |Email       |email         |Varchar(200)   |N.N  |     |
|   |User Name   |username      |Varchar(200)   |N.N  |     |
|   |Password    |password      |Varchar(255)   |N.N  |     |
|   |AccessRights|accessRights  |Varchar(200)   |N.N  |     |
|   |Delete Flag |deleteFlag    |TinyInt(1)     |N.N  |default 0|

|Book|   |   |   |   |
|-- |------------|--------------|---------------|-----|-----|
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|Opt  |
| P |Book ID     |bookID        |INT(10)        |N.N  |A.I  |
|   |Book Title  |bookTitle     |Varchar(255)   |N.N  |     |
|   |Original Title|originalTitle|Varchar(255)  |N.N  |     |
|   |Year of publication|yearofPublication|INT(11)|N.N|default 0|
|   |Genre       |genre          |Varchar(30)   |N.N  |     |
|   |Number of sold|millionsSold|INT(10)        |N.N  |     |
|   |Cover Image Path|coverImagePath|Varchar(255)|N.N |     |
| F |Author ID   |authorID      |INT(10)        |N.N  |     |
|   |Delete Flag |deleteFlag    |TinyInt(1)     |N.N  |default 0|

|Author|   |   |   |   |
|-- |------------|--------------|---------------|-----|-----|
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|Opt  |
| P |Author ID   |authorID      |INT(10)        |N.N  |A.I  |
|   |Name        |name          |Varchar(30)    |N.N  |     |
|   |Surname     |surname       |Varchar(30)    |N.N  |     |
|   |Nationality |nationality   |Varchar(30)    |N.N  |     |
|   |BirthYear   |birthyear     |INT(10)        |N.N  |     |
|   |DeathYear   |deathyear     |INT(10)        |NULL |     |
|   |Delete Flag |deleteFlag    |TinyInt(1)     |N.N  |default 0|

|Log|   |   |   |   |
|-- |------------|--------------|---------------|-----|-----|
|Key|Logical_Name|Physical_Name |Datatype       |NULL?|Opt  |
| P |Log ID      |logID         |INT(10)        |N.N  |A.I  |
|   |Date Created|dateCreated   |Datetime       |N.N  |     |
|   |Date Changed|dateChanged   |Datetime       |N.N  |default NULL|
| F |Book ID     |bookID        |INT(10)        |N.N  |     |
| F |User ID     |userID        |INT(10)        |N.N  |     |

#### 2-8. API Access Right (Guest, User and Admin)
* / [get]                         
* /login.html [get]               
* /view_books.html [get]          
* /book.html?id=ID [get]
* /api/users/login
* /api/users/logout
* /api/users/check
* /api/books
* /api/books/ID


#### 2-9. Development Process
##### ①. Build basic architecture + development environment.
-> file structure

-> check req & res and simple MVC

-> connect to DB

##### ②. Front page Desgin (view)
-> bootstrap & fontawesome and customize

##### ③. Database tables set up
-> sql for tables

##### ④. Server Function Implement (model & control)







