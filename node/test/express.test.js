'use strict';

var mocha = require('mocha');
var chai = require('chai');
// var expect = chai.expect;
chai.should();
var assert = chai.assert;

var express = require('express');
var app = require('../app.js');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
// process.env.NODE_ENV = 'test';
app.settings.env = 'test';

// var config = require('../server/_config');
// config.init(app);
var config = require('../server/_config').init(app.get('env'));

// var settings = config.settings;

var fixture = require('./fixtures/fixture');
var tweets = fixture.tweets;

var database = require('../server/database');
database.connectDatabase(config);
var db = database.db;


describe('Database', function() {

  it('Should create a database', function(done){
    db.create(function(err, res) {
      if (err) return done(err);
      res.ok.should.be.true;
      done();
    });
  })

  it('Should save a document', function(done) {
    db.save('skywalker', {
      force: 'light',
      name: 'Luke Skywalker'
    }, function (err, res) {
      if (err) return done(err);
      res.ok.should.be.true;
      done();
    });
  })

  it('Should delete a document', function(done) {
    db.remove('skywalker', function (err, res) {
      if (err) return done(err);
      res.ok.should.be.true;
      done();
    });
  })

  it('Should save a tweet', function(done) {
    db.save(tweets[0].id_str, tweets[0], function (err, res) {
    // db.save(tweets[0], function (err, res) {
      if (err) return done(err);
      res.ok.should.be.true;
      done();
    });
  })

  it('Should save a few more tweets', function(done) {

    var increment = 0;

    // console.log('DB info: ' + db.info);

    for (var i = 0; i < tweets.length; i++) {
      db.save(tweets[i].id_str, tweets[i], function (err, res) {
        if (err) return done(err);
        res.ok.should.be.true;
        increment++;
        testComplete();
      });
    }
    function testComplete() {
      if (increment === tweets.length) {
        increment.should.equal(tweets.length);
        done();
      }
    }
  })

  // it('Should save another tweet', function(done) {
  //   db.save(tweets[2].id_str, tweets[2], function (err, res) {
  //   // db.save(tweets[0], function (err, res) {
  //     if (err) return done(err);
  //     res.ok.should.be.true;
  //     done();
  //   });
  // })

  it('Should create a view', function(done) {
    db.save('_design/tweets', {
      all: {
        map: function (doc) {
          if (doc.user.screen_name) emit(doc.user.screen_name, doc);
        }
      },
      favourited: {
        map: function (doc) {
          if (doc.user.screen_name && doc.favourited == true) {
            emit(null, doc);
          }
        }
      }
    }, function(err, res) {
      if (err) return done(err);
      res.ok.should.be.true;
      done();
    });
  })

  it('Should load all tweets in view', function(done) {
    db.view('tweets/all', function (err, res) {
      // console.log(res);
      res.forEach(function (key, row, id) {
        row.user.screen_name.should.equal(key);
        // console.log("%s has view key %s.", row.user.screen_name, key);
      });
      done();
    });
  })

  it('Should delete the database', function(done){
    db.destroy(function(err, res) {
      if (err) return done(err);
      res.ok.should.be.true;
      done();
    });
  })
})
