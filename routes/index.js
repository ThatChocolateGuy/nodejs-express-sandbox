var express = require('express');
var router = express.Router();

var anyArray = [
  'Nem',
  'Nom',
  'Nobbers',
  1, 2, 3,
  neb = 3,
  neb + 6
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express App Scrap',
    titleCondition: 'Conditional Display Logic',
    titleArray: 'Array Display',
    titlePost: 'GET & POST Request',
    titleValidation: 'Form Validation',
    titleMongo: 'DB Insert & Get Data',
    success: req.session.success,
    errors: req.session.errors,
    condition: true,
    anyArray: anyArray
  });

  req.session.errors = null;
  req.session.success = null;
});

router.post('/submit', (req, res) => {
  // check validity
  req.check('email').isEmail().withMessage('Invalid email address');
  req.check('password')
    .isLength({min: 4}).withMessage('Password is invalid')
    .equals(req.body.confirmPassword).withMessage('Passwords must match');

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }

  res.redirect('/');
});

module.exports = router;