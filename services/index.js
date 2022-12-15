const mysql = require ('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tom100@g', //Coloca a tua senha aqui
    database: 'nodemysql1'
});

conn.connect(function(err) {
    if (err) {
        console.log(err);
    } 
});

function createBook(book){
    const query = `INSERT INTO books (title, pages, status, idusers) VALUES ('${book.title}', '${book.pages}', '${book.status}', '${book.idusers}')`;

    conn.query(query, function(err) {
        if (err) {
            console.log(err);
        }
    });
}
async function listBooks() {
    const promisse = new Promise((resolve, reject) => {
        const query = 'SELECT * FROM books';
    
        conn.query(query, function(err, data) {
            if (err) reject([]);
    
            resolve(data);
        });
    }).then(books => books)
    .catch(err => err);

    return await promisse;
}
function editBook(book){
    const query = `UPDATE books SET title = '${book.title}', pages = '${book.pages}', status = '${book.status}' WHERE idbooks = '${book.idbooks}'`;

    conn.query(query, function(err) {
        if (err) {
            console.log(err);
        }
    });
}
function deleteBook(id){
    const query = 'DELETE FROM books WHERE idbooks = ?';

    conn.query(query, id, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function createUser(user){
    const query = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`;

    conn.query(query, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

async function listUsers(user) {
    const promisse = new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
    
        conn.query(query, function(err, data) {
            if (err) reject([]);
    
            resolve(data);
        });
    }).then(users => users)
    .catch(err => err);

    return await promisse;
}

module.exports = {
    conn,
    createBook,
    listBooks,
    editBook,
    deleteBook,
    createUser,
    listUsers,
}