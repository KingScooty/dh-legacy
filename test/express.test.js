'use strict';

var mocha = require('mocha');
var chai = require('chai');
// var expect = chai.expect;
chai.should();

var express = require('express');
var app = require('../app.js');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
// process.env.NODE_ENV = 'test';
app.settings.env = 'test';

var config = require('../server/_config');
config.init(app);

var settings = config.settings;

var tweets = require('../server/fixture');

var database = require('../server/database');
database.connectDatabase(settings);
var db = database.db;



describe('Database', function(){
  it('Should create a database', function(){

    db.create();

    db.exists(function (err, exists) {
      exists.should.be.true;
    });

  })

  it('Should save a tweet', function() {

    db.save('skywalker', {
      force: 'light',
      name: 'Luke Skywalker'
    }, function (err, res) {
      err.should.not.be.true;
    });

  })

  it('Should delete a tweet', function() {

    db.remove('skywalker', function (err, res) {
      // Handle response
      err.should.not.be.true;
    });

  })

  it('Should delete a database', function(){

    db.destroy();

    db.exists(function (err, exists) {
      exists.should.be.false;
    });

  })
})
