var express = require('express');
var app = express();

if (!process.env.MIXPANEL_SECRET) {
  console.log('No app secret defined. Please define the "MIXPANEL_EVENT" environment variable!');
  return;
}
var baseUrl = "https://" + process.env.MIXPANEL_SECRET + "@mixpanel.com/api/2.0";


app.get('/reports/:venue_id', function (req, res) {
  var venue = req.params.venue_id

  return res.status(200);
});

app.listen(3000, function () {
  console.log("The app is running");
});