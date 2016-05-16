/**
 * Bulk update docs in couchdb
 * Read docs in runbook to use this.
 */

exports.conf = {
  "tasks": {
    "all_docs": function (util, doc) {
      util.log(doc);
    },
    // 2012 media urls are now wrong. Need to change `.com/` to `.com/media/`.
    // Some of the assets already have /media/, so need to unify.
    // This only needs to be run once.
    "transform_media_urls": function(util, doc) {
      var media = doc.media;

      if (media) {
        var newUrl = media.replace(".com/", ".com/media/");
        doc.media = newUrl.replace("/media/media/", "/media/");

        util.save(doc);  
      }
    }
  }
};
