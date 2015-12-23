var
  express = require('express'),
  bcrypt = require('bcrypt'),
  User = require('../models/user');

var router = express.Router();

router.route('/')
  .post(function checkForUser(req, res){
    var body = req.body;
    User.findOne({email: body.email}, function createUser(err, doc) {
      if(err) return res.status(500).send(err);
      if(doc) return res.send({message: 'user already exists'});
      bcrypt.hash(body.password, 10, function(err, hash){
        body.password = hash;
        User.create(body, function sendSavedUser(err, user) {
          if(err) return res.status(500).send(err);
          res.send(user);
        })
      });
    })
  })

router.route('/login')
  .post(function updateUser(req, res){
    User.findOne({email: req.body.email}, function checkUser(err, doc){
      if(err) return res.status(500).send(err);
      bcrypt.compare(req.body.password, doc.password, function checkHashedPassword(err, result) {
        if(err) return res.status(500).send(err);
        if(!result) return res.send({message: 'wrong password'});
        res.send({favorites: doc.favorites});
      })
    })
  })

router.route('/:id')

module.exports = exports = router;
