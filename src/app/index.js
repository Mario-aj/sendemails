require("dotenv").config();

const { getTargets } = require("./getTargets");
const { transporter } = require("./nodemailer");
const { readHTMLTemplate } = require("./readHtmlTemplate");

const CV_PATH =
  "/home/mario-aj/Documents/Mario_Alfredo_Jorge_Software_Developer.pdf";

async function send() {
  readHTMLTemplate(__dirname + "/template.html", async (template) => {
    const sender = `"Mário Alfredo Jorge" ${process.env.USER_EMAIL}`;
    const subject = "Mensagem automática";
    const targets = await getTargets();
    targets.forEach(async (target) => {
      const html = template({ username: target?.username });
      await transporter
        .sendMail({
          from: sender,
          to: target?.email,
          subject: target?.subject || subject,
          text: "Hey!",
          html,
          attachments: [{ path: CV_PATH }],
        })
        .then(() => console.log("Email sent to: " + target?.email))
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
