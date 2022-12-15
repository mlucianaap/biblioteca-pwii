const express = require('express');
const { listBooks, createBook, deleteBook, editBook, createUser, listUsers } = require('../services');
const rotas = express.Router();

rotas.get('/', async (req, res) => {
    res.render('login', { title: 'Entrar' });
});

rotas.get('/signup', async (req, res) => {
    res.render('signup', { title: 'Cadastro de Usuário' });
});

rotas.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const users = await listUsers();

    const emailIgual = users.filter(
        user => user.email == email
    )[0];

    console.log(emailIgual);

    if (emailIgual === undefined) {
        const user = {
            name,
            email,
            password
        }
    
        createUser(user);
    
        res.redirect('/');
        
    } else {
        res.render('signup', {
            title: "Cadastro de Usuário",
            error: "Email já associado a um usuário. Utilize outro endereço de email."
        });
    }
});

rotas.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await listUsers();

    const user = users.filter(
        user => user.email == email && user.password == password
    )[0];

    if (user != null) {
        res.redirect(`/home/${user.idusers}`);
    } else {
        res.render('login', {
            title: "Login",
            error: "Email ou senha inválidos"
        }); 
    }

});

rotas.get('/logout', (req, res) => {
    res.redirect("/");
});

rotas.get('/home/:idusers?', async (req, res) => {
    const { idusers } = req.params;
    const users = await listUsers();
    const books = await listBooks();

    const user = users.filter(user => user.idusers == idusers)[0];
    const booksUser = books.filter(
        book => book.idusers == idusers
    );

    res.render('home', { booksUser, title: 'Controle de Livros', user });
});

rotas.post('/home/:idusers/filtro', async (req, res) => {
    const { idusers } = req.params;
    const { status } = req.body;
    const users = await listUsers();
    const books = await listBooks();

    const user = users.filter(user => user.idusers == idusers)[0];
    const booksUser = books.filter(
        book => book.idusers == idusers && book.status == status
    );

    console.log(req.body);

    res.render('home', { booksUser, title: 'Controle de Livros', user });
});

rotas.post('/home/insert', (req, res) => {
    const { title, pages, status, idusers } = req.body;

    const book = {
        title,
        pages,
        status,
        idusers
    }

    createBook(book);

    res.redirect(`/home/${idusers}`);
});

rotas.get('/home/:idusers/delete/:idbooks', function (req, res) {
    const { idusers, idbooks } = req.params;
    deleteBook(idbooks);

    res.redirect(`/home/${idusers}`);
});

rotas.get('/home/edit/:idbooks?', async (req, res) => {
    const { idbooks } = req.params;
    const books = await listBooks();

    const book = books.filter(b => b.idbooks == idbooks);

    res.render('edit', { book: book, title: 'Editar Livro' });
});

rotas.post('/home/edit', (req, res) => {
    const { idbooks, idusers, title, pages, status } = req.body;

    const book = {
        idbooks,
        title,
        pages,
        status,
        idusers
    }

    console.log(req.body);

    editBook(book);

    res.redirect(`/home/${idusers}`);
});


module.exports = rotas;