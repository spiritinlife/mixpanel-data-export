var express = require('express'),
  request = require('request'),
  moment = require('moment'),
  app = express();

if (!process.env.MIXPANEL_SECRET) {
  console.log('No app secret defined. Please define the "MIXPANEL_EVENT" environment variable!');
  return;
}
var basicHeader = ' Basic ' + new Buffer(process.env.MIXPANEL_SECRET).toString('base64')
var baseUrl = "https://mixpanel.com/api/2.0";


app.get('/reports/:venue_id', function (req, res) {
  var venue = req.params.venue_id;
  var today = moment();
  var queryString = '?';

  queryString += 'event=' + 'View venue card';
  queryString += '&from_date=' + today.format('YYYY-MM-DD');
  queryString += '&to_date=' + today.format('YYYY-MM-DD');
  queryString += '&interval=1';

  request({
      url: baseUrl + '/segmentation' + queryString,
      headers: {'Authorization': basicHeader}
    }, function (error, response, body) {
      console.log(error, body);
      if (!error && response.statusCode == 200) {
        return res.status(200).json(body);
      } else {
        return res.status(400).json(error);
      }
    }
  )

});

app.listen(3000, function () {
  console.log("The app is running");
});