require("dotenv").config();

const { transporter } = require("./nodemailer");
const { readHTMLTemplate } = require("./readHtmlTemplate");

const target = {
  email: "www.maurok@gmail.com",
  username: "FooBar",
};

async function main() {
  readHTMLTemplate(__dirname + "/template.html", async (template) => {
    const html = template({ username: target.username });
    const sender = `"Mário Alfredo Jorge" ${process.env.USER_EMAIL}`;

    await transporter.sendMail({
      from: sender,
      to: `${target.email}`,
      subject: "Frontend developer",
      text: "Hey!",
      html,
    });

    console.log("Email sent to: " + target.email);
  });
}

main().catch(console.error);
