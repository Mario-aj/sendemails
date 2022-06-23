require("dotenv").config();

const { transport } = require("./nodemailer");
const { readHTMLTemplate } = require("./readHtmlTemplate");

const user = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
  sender: `"Mário Alfredo Jorge" ${process.env.USER_EMAIL}`,
};

const target = {
  email: "www.maurok@gmail.com",
  username: "FooBar",
};

async function main() {
  let transporter = transport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    user,
  });

  readHTMLTemplate(__dirname + "/template.html", async (template) => {
    const html = template({ username: target.username });
    await transporter.sendMail({
      from: user.sender,
      to: `${target.email}`,
      subject: "Frontend developer",
      text: "Hey!",
      html,
    });

    console.log("Email sent to: " + target.email);
  });
}

main().catch(console.error);
