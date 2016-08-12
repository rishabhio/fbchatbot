
var express = require('express');
var app = express();
var VALIDATION_TOKEN = process.env.MESSENGER_VALIDATION_TOKEN;

app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log('served a request');
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
	