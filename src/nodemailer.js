const nodemailer = require("nodemailer");

module.exports = {
  transport: ({ host, port, secure, user }) =>
    nodemailer.createTransport({
      host,
      port,
      secure,
      replyTo: user.email,
      auth: {
        user: user.email,
        pass: user.password,
      },
    }),
};
