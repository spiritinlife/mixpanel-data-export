//reports/:id
//segmantation eendpoint


var express = require('express');
var app = express();


app.get('/reports/:venue_id', function (req, res) {
  res.send('the venue_id is' + req.params.venue_id);
});

app.listen(3000, function () {
  console.log("The app is running");
});