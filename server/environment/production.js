console.log('PRODUCTION.');

var settings = {
  database : {
    host : process.env.DB_HOST,
    name: 'digitalheroes-2014',
    auth: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  },
  twitter: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  }
}

// exports.settings = settings;
module.exports = settings;
