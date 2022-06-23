const fs = require("fs");

async function getTargets() {
  const data = fs.readFileSync(__dirname + "/targets.txt", "utf8");

  const targets = data.split("\n").map((line) => {
    let [email, subject] = line.split(" ");
    const username = email
      .split("@")[0]
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/[1-9]/g, "");
    subject = subject.replace(/_/g, " ");
    return { email, subject, username };
  });

  return targets || [];
}

module.exports = { getTargets };
