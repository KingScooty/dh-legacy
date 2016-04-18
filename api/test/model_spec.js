var chai = require('chai');
var expect = chai.expect;

// var proxyquire = require('proxyquire');

var tweetMock0 = require('./mocks/tweet0.json');
var tweetMock1 = require('./mocks/tweet1.json');

var eventMock0 = require('./mocks/event_info0.json');
var eventMock1 = require('./mocks/event_info1.json');

var dbHelpers = require('./helpers/couchdb');

var nano = require('nano')('http://localhost:5984');

var dbName1 = 'dh_2016_test';
var dbName2 = 'dh_halloween15_test';

chai.should();

describe('Mock data', () => {

  before(function(done) {

    var db1 = nano.use(dbName1);
    var db2 = nano.use(dbName2);

    var designDoc = {
      "views": {
        "all": {
          map: function(doc) {
            if (doc._id) emit(doc._id, doc);
          }
        },
        "all_tweets": {
          map: function (doc) {
            if (doc.type === 'tweet') emit(doc._id, doc);
          }
        },
        "event_info": {
          map: function (doc) {
            if (doc.type === 'info') emit(doc._id, doc);
          }
        }
      }
    };

    this.timeout(5000);

    // EventMock0 saved to dh_halloween15_test.
    // Hello??
    // TweetMock1 saved to dh_halloween15_test.
    // EventMock1 saved to dh_2016_test.
    // TweetMock0 saved to dh_2016_test.
    // TweetMock0 saved to dh_halloween15_test.

    // EventMock1 saved to dh_2016_test.
    // TweetMock0 saved to dh_2016_test.
    // Hello??
    // EventMock0 saved to dh_halloween15_test.
    // TweetMock0 saved to dh_halloween15_test.
    // TweetMock1 saved to dh_halloween15_test.

    dbHelpers.createDB(dbName1)
    .then(dbHelpers.insertTweet(db1, 0))
    .then(dbHelpers.insertEvent(db1, 1))
    .then(dbHelpers.updateDesignDoc(db1, 'tweets', designDoc))

    .then(dbHelpers.createDB(dbName2))
    .then(dbHelpers.insertTweet(db2, 0))
    .then(dbHelpers.insertTweet(db2, 1))
    .then(dbHelpers.insertEvent(db2, 0))
    .then(dbHelpers.updateDesignDoc(db2, 'tweets', designDoc))



    .then(function() {
      done();
    })
    .catch(function(err) {
      console.log(err);
    });

  });

  it('should contain a design document', (done) => {
    var db = nano.db.use(dbName2);
    console.log('Hello??');
    db.view('tweets', 'all', function(err, body) {
      if (err) return err;

      var docs = [];
      body.rows.forEach(function(doc) {
        docs.push(doc);
      });
      console.log(docs[0].value.id);
      console.log(tweetMock0.id);
      (docs[0].value.id).should.equal(tweetMock0.id);
      done();
    });
  });

});

describe('Model', () => {

  var Model;
  var db = {
    connection: nano,
    databaseList: {
      db1: nano.use('dh_2016_test'),
      db2: nano.use('dh_halloween15_test')
    }
  }

  before(function() {
    // var dbMock = {
    //   connection: nano,
    // };

    // Event = proxyquire('../models/model', {
    //   '../db': dbMock
    // });
    Model = require('../models/model');
  });

  it('should set an internal database connection', () => {
    var model = new Model(db);

    expect(model.connection).to.be.an.instanceOf(Object)
      .and.have.any.keys('config', 'db');
  });

  it('should set an internal database list', () => {
    var model = new Model(db);

    expect(model.databaseList).to.be.an.instanceOf(Object)
      .and.have.all.keys('db1', 'db2');
  });

  it('should set an internal default database', () => {
    var model = new Model(db);
    expect(model.defaultDatabase).to.be.an.instanceOf(Object);
  });

  it('should set the default database to the last known event', () => {
    var model = new Model(db);

    expect(model.defaultDatabase.config.db)
      .to.equal('dh_halloween15_test');
  });


  // describe('syncDesignDoc()', () => {
  //   it('should save the latest design doc to the default database', (done) => {
  //
  //     var model = new Model();
  //
  //     model.syncDesignDoc(null, function(err, response) {
  //       if (err) return console.log(err);
  //       expect(response).to.be.ok;
  //       expect(response.id).to.equal('_design/tweets');
  //       done();
  //     });
  //
  //   });
  //
  //   it('should save the latest design doc to a specified database', (done) => {
  //
  //     var model = new Model();
  //
  //     model.syncDesignDoc('dh_2016', function(err, response) {
  //       if (err) return console.log(err);
  //       expect(response).to.be.ok;
  //       expect(response.id).to.equal('_design/tweets');
  //       done();
  //     });
  //
  //   });
  // });

  describe('listAll()', () => {
    it('returns the all docs from the default database', (done) => {

      var model = new Model(db);

      model.listAll()
      .then(function(response) {
        expect(response).to.be.ok;
        expect(response).to.have.length(3);
        expect(response[0].doc.id_str).to.equal(tweetMock0.id_str);
        expect(response[1].doc.id_str).to.equal(tweetMock1.id_str);
        expect(response[2].id).to.equal(eventMock0._id);
        done();
      }).catch(function(err) {
        console.log(err);
      });

    });

    it('should return the all docs from the a specified database', (done) => {

      var model = new Model(db);

      model.listAll('db1')
      .then(function(response) {
        expect(response).to.be.ok;
        expect(response).to.have.length(2);
        expect(response[0].doc.id_str).to.equal(tweetMock0.id_str);
        expect(response[1].id).to.equal(eventMock1._id);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });

    });

    // it('should gracefully fail if database does not exist', (done) => {
    //
    //   var model = new Model();
    //
    //   model.findAll('fail')
    //   .then(function(response) {
    //     expect(response).to.be.ok;
    //     expect(response).to.have.length(2);
    //     expect(response[0].value.id_str).to.equal(tweetMock0.id_str);
    //     expect(response[1].id).to.equal(eventMock1._id);
    //     done();
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    //
    // });

  });

  describe('findByType()', () => {

    it('should return all documents by event type only from default database', (done) => {

      var model = new Model(db);

      model.findByType(null, 'tweets', 'event_info')
      .then(function(response) {
        expect(response).to.be.ok;
        expect(response).to.have.length(1);
        expect(response[0].id).to.equal(eventMock0._id);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });

    });

    it('should return all documents by tweet type only from default database', (done) => {

      var model = new Model(db);

      model.findByType(null, 'tweets', 'all_tweets')
      .then(function(response) {
        expect(response).to.be.ok;
        expect(response).to.have.length(2);
        expect(response[0].value.id_str).to.equal(tweetMock0.id_str);
        expect(response[1].value.id_str).to.equal(tweetMock1.id_str);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });

    });

    it('should return all documents by event type only from specified database', (done) => {

      var model = new Model(db);

      model.findByType('db1', 'tweets', 'event_info')
      .then(function(response) {
        expect(response).to.be.ok;
        expect(response).to.have.length(1);
        expect(response[0].id).to.equal(eventMock1._id);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });

    });

    it('should return all documents by tweet type only from specified database', (done) => {

      var model = new Model(db);

      model.findByType('db1', 'tweets', 'all_tweets')
      .then(function(response) {
        expect(response).to.be.ok;
        expect(response).to.have.length(1);
        expect(response[0].value.id_str).to.equal(tweetMock0.id_str);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });

    });
  });

  after((done) => {
    nano.db.destroy('dh_halloween15_test', function(err, res) {
      if (err) return console.log(err);
      nano.db.destroy('dh_2016_test', function(err, res) {
        if (err) return console.log(err);
          done();
      });
    });
  });

});
