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
    console.log('attempting login...')
    User.findOne({email: req.body.email}, function checkUser(err, doc){
      if(err) return res.status(500).send(err);
      if(doc === null) return res.status(401).send({message: 'no such user'});
      bcrypt.compare(req.body.password, doc.password, function checkHashedPassword(err, result) {
        if(err) return res.status(500).send(err);
        if(!result) return res.send({message: 'wrong password'});
        req.session.isLoggedIn = true;
        req.session.email = req.body.email;
        res.send({favorites: doc.favorites});
      })
    })
  })

router.route('/addfavorite')
  .post(function addFavorite(req, res){
    var body = req.body;
    if(!req.session.isLoggedIn) return res.send({message: 'not logged in'});
    User.findOneAndUpdate(
      {email: req.session.email},
      {$push: {favorites: body}},
      {safe: true, upsert: true, new: true},
      function confirmFaveAdd(err) {
        if(err) return res.status(500).send(err);
        res.send({
          success: 'true',
          method: 'PUT'
        });
    });
  })

router.route('/logout')
  .all(function logoutUser(req, res){
    req.session.destroy(function(){
      res.send({message: 'user logged out. session deleted.'})
    })
  })

router.route('/:id')

module.exports = exports = router;
