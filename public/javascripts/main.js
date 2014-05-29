
var digitalheroes = digitalheroes || {};

// if ((window.location.hostname === 'www.digital-heroes.com') ||
// (window.location.hostname === 'digital-heroes.com')) {
//   console.log('Digital Heroes 2014 - Let\'s Do This!');
//   digitalheroes.domain = 'digital-heroes.com';
// } else {
//   digitalheroes.domain = 'http://0.0.0.0:3000';
// }

Handlebars.registerHelper('changeImageSize', function(text) {
  return text.replace("normal", "200x200");
});

digitalheroes.templateInit = jQuery(function($) {

  digitalheroes.templates = {};

  $('.handlebars').load('/javascripts/tweet.hbs', function() {
    var tweetTemplate = $(".handlebars").find(".template--tweet").html();
    digitalheroes.templates.tweet = Handlebars.compile(tweetTemplate);
  });
});


digitalheroes.tweets = jQuery(function($) {
  var html;

  // var socket = io.connect(digitalheroes.domain);
  var socket = io.connect();

  socket.on('connect', function () {

    // $('.logo').transition({
    //   opacity: 0
    // }, 200)
    // .transition({
    //   opacity: 1,
    //   top: "-450px"
    // }, 0)

    $('.socket-connection__status').addClass('socket-connection__status--up');
    $('.socket-connection__status').removeClass('socket-connection__status--down');

    $('.socket-connection__status').text('Active - Downloading content...');

    socket.emit("greetingFromVisitor", 'word!');
    console.log('Emitting greeting to server');
    // socket.emit("greeting", { key : seed });
  });

  socket.on('replyToGreeting', function(data) {
    console.log(data);

    $('.logo')
    .transition({
      top: "50px",
      duration: 400,
      easing: 'easeInCirc'
    }, function() {
      $('.logo').addClass('shake shake_y');
      $('.bg2').addClass('active shake shake_x');
      $('.tweet-list').removeClass('inactive');
    });

    $('.socket-connection__status').text('Active');

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      html = digitalheroes.templates.tweet(data[i]);

      $('.tweet-list').prepend(html);

      var $tweetTime = $('.timeago', $('.tweet:first-child'));
      $tweetTime.timeago();
    }
  });

  socket.on('incomingTweet', function (data) {
    console.log('Incoming tweet...');
    console.log(data);

    html = digitalheroes.templates.tweet(data);

    $('.tweet-list').prepend(html);

    var $tweetTime = $('.timeago', $('.tweet:first-child'));
    $tweetTime.timeago();

  });

  socket.on('disconnect', function() {
    $('.socket-connection__status').text('Down');

    $('.socket-connection__status').addClass('socket-connection__status--down');
    $('.socket-connection__status').removeClass('socket-connection__status--up');
  });

});
