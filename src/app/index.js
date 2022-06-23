require("dotenv").config();

const { target } = require("./target");
const { transporter } = require("./nodemailer");
const { readHTMLTemplate } = require("./readHtmlTemplate");

async function send() {
  readHTMLTemplate(__dirname + "/template.html", async (template) => {
    const html = template({ username: target.username });
    const sender = `"Mário Alfredo Jorge" ${process.env.USER_EMAIL}`;

    await transporter
      .sendMail({
        from: sender,
        to: `${target.email}`,
        subject: "Frontend developer",
        text: "Hey!",
        html,
      })
      .then(() => console.log("Email sent to: " + target.email))
      .catch((error) =>
        console.error(
          "We have a problem to send email to " + target.email + ": ",
          error
        )
      );
  });
}

module.exports = { send };
