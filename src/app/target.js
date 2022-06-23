const fs = require("fs");

function getTarget() {
  fs.readFile(__dirname + "/targets.txt", "utf8", (err, data) => {
    if (err) throw err;
    const targets = data.split("\n").map((line) => {
      const [email, subject] = line.split(" ");
      const username = email
        .split("@")[0]
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/[1-9]/g, "");
      return { email, subject, username };
    });

    return targets || [];
  });
}

const targets = getTarget();

module.exports = { targets };
