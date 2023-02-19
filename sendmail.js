var nodemailer = require("nodemailer");

const sendMail = (User, token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "priyankagrawal76660@gmail.com",
      pass: "@123Priyank",
    },
  });

  var mailOptions = {
    from: "priyankagrawal76660@gmail.com",
    to: "mohitagawal76660@gmail.com",
    subject: "Password reset request",
    text: `http://localhost:3000/reset-password?token=${token}&id=${User._id}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
}

module.exports = { sendMail }