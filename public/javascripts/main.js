
var digitalheroes = digitalheroes || {};

if (window.location.hostname === 'digital-heroes.com') {
  console.log('Digital Heroes 2014 - Let\'s Do This!');
  digitalheroes.domain = 'digital-heroes.com';
} else {
  digitalheroes.domain = 'http://0.0.0.0:3000';
}

digitalheroes.templateInit = jQuery(function($) {

  digitalheroes.templates = {};

  $('.handlebars').load('/javascripts/tweet.hbs', function() {
    var tweetTemplate = $(".handlebars").find(".template--tweet").html();
    digitalheroes.templates.tweet = Handlebars.compile(tweetTemplate);
  });
});


digitalheroes.tweets = jQuery(function($) {
  var html;

  var socket = io.connect(digitalheroes.domain);

  socket.on('connect', function () {
    socket.emit("greetingFromVisitor", 'word!');
    console.log('Emitting greeting to server');
    // socket.emit("greeting", { key : seed });
  });

  socket.on('replyToGreeting', function(data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      html = digitalheroes.templates.tweet(data[i]);

      $('.tweet-list').prepend(html);

      var $tweetTime = $('.timeago', $('.tweet:first-child'));
      $tweetTime.timeago();
    }
  });

  socket.on('incomingTweet', function (data) {
    console.log(data);

    html = digitalheroes.templates.tweet(data);

    $('.tweet-list').prepend(html);

    var $tweetTime = $('.timeago', $('.tweet:first-child'));
    $tweetTime.timeago();

  });

});
