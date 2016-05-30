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
  var today = moment().subtract(2, "days");
  var fromDate= moment().subtract(6, "days");
  var queryString = '?';

  queryString += 'event=' + 'View venue card';
  queryString += '&from_date=' +  fromDate.format('YYYY-MM-DD');
  queryString += '&to_date=' + today.format('YYYY-MM-DD');
  queryString += '&interval=1'; //number of days bucketed

  request({
      url: baseUrl + '/segmentation' + queryString,
      headers: {'Authorization': basicHeader}
    }, function (error, response, body) {
      //console.log(error, body);
      var test=JSON.parse(body)
      console.log(test.data.values["View venue card"]);
      var venue_card = test.data.values["View venue card"];
      var total_venues=0;
      for(x in venue_card )
      {
        console.log(venue_card[x]);
        total_venues+=parseInt(venue_card[x]);
      }

    console.log(test.data.values);
    console.log("my total venues "+total_venues);

      if (!error && response.statusCode == 200) {
        return res.status(200).json(body);
      } else {
        return res.status(400).json(error);
      }
    }
  )

});

app.get("/reports/events",function (req, res) {


  var queryString2 = 'events/names?type=';
  var type = "general";

  queryString2 = queryString2 + type;




  request({
    url:baseUrl+queryString2,
    headers: {'Authorization': basicHeader}
  },function(error, response, body) {
      //console.log(error, body);
      var test = JSON.parse(body);
      console.log(test);
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