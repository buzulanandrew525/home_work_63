const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('protected', { user: req.user });
});

module.exports = router;
