
const express = require ('express');
const { engine } = require ('express-handlebars');
const rotas = require('./rotas/index');
const db = require('./services/index');
var porta = 3000;

var app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use("/public", express.static(__dirname + '/public'));

app.use(rotas);

if (db.conn) {
    console.log('Conectado ao MySQL');
    app.listen(porta);
} else {
    console.log('Erro ao conectar ao MySQL');
}

