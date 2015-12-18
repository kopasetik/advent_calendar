var
  express = require('express'),
  Api = require('../models/api');

var router = express.Router();

router.route('/')
  .get(function getApiList(req, res) {
    console.log('get list of APIs');
    Api.find(function sendApis(err, apis){
      if(err) return res.status(500).send(err);
      res.send(apis);
    });
  })
  .post(function postOneApi(req, res){
    console.log('post one API');
    res.send({
      success: 'true',
      method: 'POST'
    });
  })

router.route('/:id')
  .get(function getOneApi(req, res){
    console.log('get one API - ID #' + req.params.id);
    res.send({
      success: 'true',
      method: 'GET'
    });
  })
  .put(function putOneApi(req, res){
    console.log('put/update one API - ID #' + req.params.id);
    res.send({
      success: 'true',
      method: 'PUT'
    });
  })
  .delete(function deleteOneApi(req, res){
    console.log('delete one API - ID #' + req.params.id);
    res.send({
      success: 'true',
      method: 'DELETE'
    });
  })

module.exports = exports = router;
