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

const bot = new BootBot({
  accessToken:  config.pageAccessToken,
  verifyToken: config.validationToken,
  appSecret: config.appSecret
})


app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
