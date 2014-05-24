/*
Handlebars.registerPartial("topPick", $('.partial--topPick').html());
Handlebars.registerPartial("nonTopPick", $('.partial--nonTopPick').html());
Handlebars.registerPartial("eventMedium", $('.partial--event-medium').html());

var rawtemplateLive = $('.template--live-object').html();
var compiledtemplateLive = Handlebars.compile(rawtemplateLive);

// var rawtemplateComing = $('.template--coming-up').html();
// var compiledtemplateComing = Handlebars.compile(rawtemplateComing);

var rawtemplateFuture = $('.template--future').html();
var compiledtemplateFuture = Handlebars.compile(rawtemplateFuture);

var rawtemplateFurther = $('.template--furtherAhead').html();
var compiledtemplateFurther = Handlebars.compile(rawtemplateFurther);

function renderData(data) {
  var html;
  
  html = compiledtemplateLive(data);
  $('.module--live-now').html(html);
  
  html = compiledtemplateFuture(data);
  $('.module--onwards').html(html);

  $('.module--further').html('');

  //Crude update for number of live events on.
  $('.liveeventcount').text($('.module--live-now .event-object').length);
}

function renderFurther(data) {
  var html;

  html = compiledtemplateFurther(data);
  $('.module--live-now').html('');
  $('.module--onwards').html('');
  $('.module--further').html(html);
  
}
*/

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

    console.log(html);
    $('.tweet-list').append(html);
  });

});
