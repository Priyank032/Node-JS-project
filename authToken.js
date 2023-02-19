const userSchema = require('./models/userSchema');
const resetToken = require("./models/resetToken");

const isUser = async (id) => {
    const ResetToken = await resetToken.findOne({ owner: id })
    if (ResetToken) {
        return ResetToken;

    } else {
        return false;
    }
}

const isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) {
        res.status(400)
        console.log("Invalid Request");
    }


    const user = await userSchema.findById(id)
    if (!user) {
        res.status(400)
        console.log("User not found");
    }


    if (user) {
        // console.log("helo")
        const result1 = await resetToken.findOne({ owner: id })
        if (result1) {
            const isValid = await result1.compareToken(token)
            if (!isValid) {
                res.status(400)
                console.log("Reset Token is not valid");
            }

            req.user = user
            next();

        } else {
            res.status(400)
            console.log("Verification Falied Please try again");
        }
    } else {
        console.log("WTF!!!!");
    }

}

module.exports = { isResetTokenValid };