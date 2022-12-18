const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
const { strict } = require('assert');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Add helpers in the curly braces below
const hbs = exphbs.create({});

const tacoSession = {
    secret: "Super secret taco",
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialixed: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(tacoSession));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// TODO: take off local host link
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on: http://localhost:' + PORT));
});