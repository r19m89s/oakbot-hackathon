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
  EventEmitter = require('events').EventEmitter;

var app = express();
app.set('port', config.port);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));

// App Dashboard > Dashboard > click the Show button in the App Secret field
const APP_SECRET = config.appSecret;

// App Dashboard > Webhooks > Edit Subscription > copy whatever random value you decide to use in the Verify Token field
const VALIDATION_TOKEN = config.validationToken;

// App Dashboard > Messenger > Settings > Token Generation > select your page > copy the token that appears
const PAGE_ACCESS_TOKEN = config.pageAccessToken;

// In an early version of this bot, the images were served from the local public/ folder.
// Using an ngrok.io domain to serve images is no longer supported by the Messenger Platform.
// Github Pages provides a simple image hosting solution (and it's free)
const IMG_BASE_PATH = 'https://rodnolan.github.io/posterific-static-images/';

// make sure that everything has been properly configured
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN)) {
  console.error("Missing config values");
  process.exit(1);
}
bot.on('message', (payload, chat) => {
    const text = payload.message.text;
    console.log(`The user said: ${text}`);
});
bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    console.log('The user said "hello", "hi", "hey", or "hey there"');
});
module.exports = app;
