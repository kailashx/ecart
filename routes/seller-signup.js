var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('seller-signup');
});

router.post('/', function(req, res, next){
  res.send('Welcome, ' + req.body.email+ ' and ' + req.body.pass);
  console.log('Welcome, ' + req.body.email + ' and ' + req.body.pass);
});

module.exports = router;
