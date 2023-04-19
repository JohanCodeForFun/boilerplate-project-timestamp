// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Acceptance Criteria:
// Passed: You should provide your own project, not the example URL.
// Passed: A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// Passed: A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// Failed: A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// Failed: Your project can handle dates that can be successfully parsed by new Date(date_string)
// Passed: If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
// Failed: An empty date parameter should return the current time in a JSON object with a unix key
// Failed: An empty date parameter should return the current time in a JSON object with a utc key

app.get('/api/:date?', (req, res) => {
  const queryParam = req.params;

  const timestamp = + new Date(queryParam.date);
  const dateformat = new Date(queryParam.date).toUTCString();

  let timestampPattern = /\d{13}/g;
  let datePattern = /\d{4}-\d{2}-\d{2}/g;

  if (timestampPattern.test(queryParam.date)) {
    res.json({unix: timestamp, utc: dateformat})
    console.log("timestamp pattern")
  } else if (datePattern.test(queryParam.date)) {
    res.json({unix: timestamp, utc: dateformat})
  } else {
    res.json({ error : "Invalid Date" });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
