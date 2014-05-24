
var digitalheroes = digitalheroes || {};

digitalheroes.templateInit = jQuery(function($) {

  digitalheroes.templates = {};

  $('.handlebars').load('/javascripts/tweet.hbs', function() {
    var tweetTemplate = $(".handlebars").find(".template--tweet").html();
    digitalheroes.templates.tweet = Handlebars.compile(tweetTemplate);
  });
});



digitalheroes.tweets = jQuery(function($) { 
  var html;

  var socket = io.connect('http://192.168.1.4:3000');
  socket.on('news', function (data) {
    console.log(data);

    html = digitalheroes.templates.tweet(data);

    $('.tweet-list').prepend(html);

    var $tweetTime = $('.timeago', $('.tweet:first-child'));
    $tweetTime.timeago();

  });

});