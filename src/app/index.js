require("dotenv").config();

const { getTargets } = require("./getTargets");
const { transporter } = require("./nodemailer");
const { readHTMLTemplate } = require("./readHtmlTemplate");

async function send() {
  readHTMLTemplate(__dirname + "/template.html", async (template) => {
    const sender = `"Mário Alfredo Jorge" ${process.env.USER_EMAIL}`;
    const subject = "Mensagem automática";
    const targets = await getTargets();

    if (!targets) {
      console.error("No destination email found");
      return;
    }

    targets.forEach(async (target) => {
      const html = template({ username: target?.username });
      await transporter
        .sendMail({
          from: sender,
          to: target?.email,
          subject: target?.subject || subject,
          text: "Hey!",
          html,
          attachments: [{ path: process.env.CV_PATH }],
        })
        .then((res) => console.log("Email sent to: " + res.envelope.to))
        .catch((error) =>
          console.error(
            "We have a problem to send email to " + target?.email + ": ",
            error
          )
        );
    });
  });
}

module.exports = { send };
