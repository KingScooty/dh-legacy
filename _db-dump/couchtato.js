/**
 * Bulk update docs in couchdb
 */

exports.conf = {
  "tasks": {
    "all_docs": function (util, doc) {
      util.log(doc);
    },
    "add_type_field": function (util, doc) {
      doc.type = "tweet";
      util.save(doc);
    }
  }
};
