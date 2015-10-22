'use strict';
// Amemend scroll pos so the nav never shift position by event above it.
// Modularise this file.

var target = document.querySelector('.event');
var current_event_height = 0;
var pageInitialised = false;

var getInitialEventHeight = function getInitialEventHeight() {
  return window.dh_el_event_current_height;
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {

    if (!pageInitialised) {
      current_event_height = getInitialEventHeight();
      // console.log('FIRST HEIGHT: ', current_event_height);
      pageInitialised = true;
    }

    var new_event_height = target.clientHeight;
    var diff_event_height = new_event_height - current_event_height;

    // console.log('Current height: ',current_event_height);
    // console.log('New height: ', new_event_height);
    // console.log('Diff height: ', diff_event_height);

    current_event_height += diff_event_height;

    // console.log('Current scroll: ', document.body.scrollTop);
    // console.log('Scroll modifier: ', diff_event_height);
    document.body.scrollTop += diff_event_height;
    // console.log('New scroll: ', document.body.scrollTop);
  });
});

// configuration of the observer:
var config = {
  characterData: true,
  subtree:true
};

// pass in the target node, as well as the observer options
observer.observe(target, config);

// // later, you can stop observing
// observer.disconnect();
