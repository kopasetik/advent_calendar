var
  express = require('express'),
  User = require('../models/user');

var router = express.Router();

router.route('/')
  .post(function checkForUser(req, res){
    User.findOne({email: req.body.email}, function createUser(err, doc) {
      if(err) return res.status(500).send(err);
      if(doc) return res.send({message: 'user already exists'});
        User.create(req.body, function sendSavedUser(err, user) {
          if(err) return res.status(500).send(err);
          res.send(user);
        })
    })
  })

router.route('/login')
  .post(function updateUser(req, res){
    User.findOne({email: req.body.email}, function checkUser(err, doc){
      if(err) return res.status(500).send(err);
      if(req.body.password !== doc.password) {
        return res.send({message: 'wrong password'});
      }
      res.send({favorites: doc.favorites});
    })
  })

router.route('/:id')

module.exports = exports = router;
