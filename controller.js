const userSchema = require('./models/userSchema')
const { tokenWorking, isPasswordSame } = require("./helper.js");
const { Mail } = require("./mail");
const resetToken = require("./models/resetToken");


//forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // if (!email) {
  //   res.status(400);
  //  console.log("please provide a valid email");
  // }

  const user = await userSchema.findOne({ email });
  if (!user) {
    res.status(400);
    console.log("User not Found, Invalid Credentials");
  }

  if (user) {
    const result1 = await tokenWorking(user);
    if (result1) {
      res.status(200).json({
        success: true,
        message: "password reset link is sent to your gmail",
      });
    } else {
      res.status(400);
      console.log("only after five minutes you can request fro another token");
    }
  } else {
    console.log("pta nhi kya error h bimro");
  }
};


//reset Password
const resetPassword = async (req, res) => {
  const { password } = req.body;

  const user = await userSchema.findById(req.user._id);
  if (!user) {
    res.status(400);
    console.log("User not found");
  }

  if (user) {
    const result1 = await isPasswordSame(user, password);
    if (!result1) {
      res.status(400);
      console.log("New password must be different");
    } else {
      if (password.trim().length < 8 || password.trim().length > 20) {
        res.status(400);
        console.log("password must be 8 to 20 cahracters long");
      }

      user.password = password.trim();
      const result = await user.save();
      if (result) {
        await resetToken.findOneAndDelete({ owner: user._id });
        // Mail(user);
        // console.log("success ")
        res.status(200).json({
          success: true,
          message: "Password reset Successfully",
        });;
        // res
      } else {
        res.status(400);
        console.log("password not updated Please try again after sometime");
      }
    }
  } else {
    console.log("mujhe maaf karna om sai ram!!!!");
  }
};

const resetUpdatePassword = async (req, res) => {
  const { oldpassword, password, _id } = req.body.user;

  const user = await userSchema.findById(_id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user) {
    if (await user.matchPassword(oldpassword)) {
      const result1 = await isPasswordSame(user, password);
      if (!result1) {
        res.status(400);
        throw new Error("New password must be different");
      }
      else {
        if (password.trim().length < 8 || password.trim().length > 20) {
          res.status(400);
          throw new Error("password must be 8 to 20 cahracters long");
        }
        else {

          user.password = password.trim();
          const result = await user.save();
          if (result) {
            res.json({
              success: true,
              message: "Password reset Successfully",
            });
          }
          else {
            res.status(400);
            throw new Error("password not updated Please try again after sometime");
          }
        }
      }
    }
    else {
      res.status(400);
      throw new Error("your current password is wrong");
    }
  }
  else {
    console.log("WTF!!!!");
  }
};


module.exports = {

  forgotPassword,
  resetPassword,
  resetUpdatePassword,
};