var express = require('express');
var router = express.Router();

// GET test page
router.get('/', function (req, res) {
  res.render('test')
})

// GET route id
router.get('/:id', function (req, res) {
  res.render('test', {
    output: req.params.id
  });
});

// POST from index redirects user to /test/id
router.post('/submit', function(req, res) {
  var id = req.body.id;
  res.redirect('/test/' + id);
});

module.exports = router;