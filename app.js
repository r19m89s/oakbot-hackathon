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
  APP_SECRET = config.appSecret,
  VALIDATION_TOKEN = config.validationToken,
  PAGE_ACCESS_TOKEN = config.pageAccessToken,
  IMG_BASE_PATH = 'https://rodnolan.github.io/posterific-static-images/',
  EventEmitter = require('events').EventEmitter;
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
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
