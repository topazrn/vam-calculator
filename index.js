const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const session = require('express-session');
const db = require('./middleware/database');

app.engine('handlebars', expbs({ defaultLayout: 'ui' }));
app.set('view engine', 'handlebars');
// Middleware

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static('assets'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use(require('./middleware/auth'));
app.use('/', require('./routes/dashboard'));
app.use('/view', require('./routes/view'));
app.use('/create', require('./routes/create'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
app.use('/issue', require('./routes/issue'));
app.use((req, res, next) => { res.status(404).send("Sorry can't find that!") });

app.listen('3000', () => {
    console.log('Server started at http://localhost:3000/');
});