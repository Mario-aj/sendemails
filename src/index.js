require("dotenv").config();
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const user = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
};

const target = {
  email: "www.maurok@gmail.com",
  username: "FooBar",
};

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
    } else {
      const template = handlebars.compile(html);
      callback(template);
    }
  });
};

async function main() {
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    replyTo: user.email,
    auth: {
      user: user.email,
      pass: user.password,
    },
  });

  readHTMLFile(__dirname + "/template.html", async (template) => {
    const html = template({ username: target.username });
    await transporter.sendMail({
      from: `"Mário Alfredo Jorge" ${user.email}`,
      to: `${target.email}`,
      subject: "Frontend developer",
      text: "Hey!",
      html,
    });

    console.log("Message sent");
  });
}

main().catch(console.error);
