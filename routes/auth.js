const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { getUserByEmail, addUser } = require('../users');

router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/protected',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (getUserByEmail(email)) {
    // Пользователь с таким email уже есть
    return res.render('register', { message: 'Email вже використовується' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  addUser({
    id: Date.now().toString(),
    email,
    password: hashedPassword
  });
  res.redirect('/login');
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;
