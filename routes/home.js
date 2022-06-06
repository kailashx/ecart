var express = require('express');
var db = require('../db');

var router = express.Router();

router.get('/home', function(req, res, next) {
    db.get('SELECT * FROM product',function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
         res.render('home',{page_title:"Next-Gen E-cart • Home", data:''});   
        }else{
            
            res.render('home',{page_title:"Next-Gen E-cart • Home", data:rows});
        }
                            
         });
  });

  module.exports = router;