var nodemailer = require("nodemailer");

const mail = (User) => {
  console.log("lplplplpl");
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
    subject: "Password reset successfully",
    text: "Password reset successfully Now you can login with new password",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { mail }