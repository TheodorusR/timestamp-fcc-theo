// server.js
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


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date",
function(req,res,next) {
  if (isNaN(Number(req.params.date))) {
    //input is in date format
    req.time = new Date(req.params.date);
  } else {
    //input is in miliseconds format
    req.time = new Date(Number(req.params.date));
  }
  next();
},
function (req, res) {
  if (isNaN(req.time.getTime())) {
    //invalid date format
    res.json({ error : "Invalid Date" });
  } else {
    res.json({"unix" : req.time.getTime(), "utc" : req.time.toUTCString()});
  }
});

app.get("/api/timestamp", function (req, res) {
  //path if input is empty, return current time
  req.time = new Date();
  res.json({"unix": req.time.getTime(), "utc": req.time.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
