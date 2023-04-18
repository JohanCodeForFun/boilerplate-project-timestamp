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

app.get('/api/:date?', (req, res) => {
  const { queryParam } = req.params;

  // create reqex for date, timestamp or else
  // example,[dddd-dd-dd], [d13], else...
  // match timestamp, /\d{13}/g
  // match date, /\d{4}-\d{2}-\d{2}/g
  // else ... return { error : "Invalid Date" }

  const timestamp = + new Date(queryParam);
  const dateformat = new Date(queryParam).toUTCString();
  res.json({unix: timestamp, utc: dateformat})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
