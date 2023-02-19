const ResetToken = require("./models/resetToken");
const { sendMail } = require("./sendmail");
const { createRandomBytes } = require("./generateToken");


const tokenWorking = async (User) => {
  const token = await ResetToken.findOne({ owner: User._id });
  if (token) {
    return false;
  } else {
    const token2 = await createRandomBytes();
    // console.log(token2);
    const resetToken = new ResetToken({ owner: User._id, token: token2 });
    const isSave = await resetToken.save();
    if (isSave) {
      sendMail(User, token2);
      return true;
    }
  }
};

const isPasswordSame = async (user, password) => {
  const isSamePassword = await user.matchPassword(password);
  if (isSamePassword) {
    return false;
  } else {
    return true;
  }
}

module.exports = { tokenWorking, isPasswordSame }