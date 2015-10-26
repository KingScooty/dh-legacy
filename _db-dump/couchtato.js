/**
 * Bulk update docs in couchdb
 * Read docs in runbook to use this.
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
