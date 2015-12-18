var
  express = require('express'),
  mongoose = require('mongoose');

var app = express();

app.use(express.static('public'));

app.use('/api/apilibrary', require('./controllers/api'));

app.listen(3000, function(){
  console.log('Broadcasting at port 3000...');
});
