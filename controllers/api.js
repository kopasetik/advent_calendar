var
  express = require('express');

var router = express();

router.route('/')
  .get(function getApiList(req, res) {
    console.log('get list of APIs');
  })

router.route('/:id')
  .post(function postOneApi(req, res){
    console.log('post one API - ID #' + req.params.id);
    res.send({
      success: "true",
      method: "POST"
    });
  })
  .get(function getOneApi(req, res){
    console.log('get one API - ID #' + req.params.id);
    res.send({
      success: "true",
      method: "GET"
    });
  })

module.exports = exports = router;
