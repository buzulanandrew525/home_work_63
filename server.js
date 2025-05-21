const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const initializePassport = require('./config/passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { getUserByEmail, getUserById } = require('./users');

const app = express();

initializePassport(passport, getUserByEmail, getUserById);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'some_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', require('./routes/auth'));
app.use('/protected', require('./routes/protected'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
