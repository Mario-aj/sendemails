const handlebars = require("handlebars");
const fs = require("fs");

function readHTMLTemplate(path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
    } else {
      const template = handlebars.compile(html);
      callback(template);
    }
  });
}

module.exports = { readHTMLTemplate };
