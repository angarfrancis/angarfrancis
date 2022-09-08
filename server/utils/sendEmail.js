const nodemailer = require("nodemailer");

const SendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    host: '104.248.238.177',
    port: 587,
    auth: {
      user: "test@smart-node.net",
      pass: "qEl)en@rMp#]"
    }
  });

  const message = {
    from: `${options.desc} <test@smart-node.net>`,
    to: options.emails,
    subject: options.subject,
    text: options.text
  };

  await transport.sendMail(message).catch((err) => console.log(err))

}

module.exports = SendEmail;