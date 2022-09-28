const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service : 'google',
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "318d2dcc8c4a8e",
      pass: "0c3d37b7f0369d"
    }
  });

  module.exports = transport;