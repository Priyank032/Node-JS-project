const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetTokenSchema = new mongoose.Schema({
    owner:{
        type:String,
        required: true,
    },
    token:{
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        expires: 1000,
        default:Date.now(),
    }
})

resetTokenSchema.pre("save",async function (next) {
    if(this.isModified("token")) {
        const hash = await bcrypt.hash(this.token,10);
        this.token = hash;
    }
    next();
})

resetTokenSchema.methods.compareToken = async function(token) {
    return result = await bcrypt.compare(token, this.token);
     
};

const ResetToken = new mongoose.model("ResetToken",resetTokenSchema)

module.exports =ResetToken