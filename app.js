'use strict';
require('dotenv').config();
const 
  bodyParser = require('body-parser'),
  config = require('./config'),
  crypto = require('crypto'),
  express = require('express'),
  Cosmic = require('cosmicjs'),
  BootBot = require('bootbot'),
  chrono = require('chrono-node'),
  schedule = require('node-schedule'),
  request = require('request'),
  reminders = [],
  IMG_BASE_PATH = 'https://rodnolan.github.io/posterific-static-images/',
  EventEmitter = require('events').EventEmitter;
var app = express();
app.set('port', config.port);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // In DEV, log an error. In PROD, throw an error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    console.log("received  %s", signatureHash);
    console.log("exepected %s", expectedHash);
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

// App Dashboard > Dashboard > click the Show button in the App Secret field
const APP_SECRET = config.appSecret;

// App Dashboard > Webhooks > Edit Subscription > copy whatever random value you decide to use in the Verify Token field
const VALIDATION_TOKEN = config.validationToken;

// App Dashboard > Messenger > Settings > Token Generation > select your page > copy the token that appears
const PAGE_ACCESS_TOKEN = config.pageAccessToken;


app.get('/', function(req, res) {
  res.send("hey there boi")
})

app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){
    return res.send(req.query['hub.challenge'])
  }
  res.send('wrong token')
})

app.listen(app.get('port'), function(){
  console.log('Started on port', app.get('port'))
})


const bot = new BootBot({
  accessToken: PAGE_ACCESS_TOKEN,
  verifyToken: VALIDATION_TOKEN,
  appSecret: APP_SECRET
})

bot.setGreetingText("Hello, my name is Celeste. What would you like to be called?");
bot.hear('hello', (payload, chat) => {
  const getBucketSlug = (convo) => {
    convo.ask("What's your name?", (payload, convo) => {
      var user_name = payload.message.text;
      convo.set('user_name', user_name)
      convo.say("setting name as "+user_name);
    })
  }
});

module.exports = app;
