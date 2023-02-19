const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { userInfo } = require("os");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10s"
    })
}



const createRandomBytes = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(30, (err, buff) => {
            if (err) reject(err)
            const token2 = buff.toString('hex');
            resolve(token2)
        })
    })

module.exports = { generateToken, createRandomBytes }; 