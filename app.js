// Import All Dependencies
const dotenv = require('dotenv');
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();

const {
    forgotPassword,
    resetPassword,
    resetUpdatePassword,
} = require("./controller.js");
// Configure ENV File & Require Connection File
dotenv.config({ path: './config.env' });
require('./db/conn');
const port = process.env.PORT;

// Require Model
const Users = require('./models/userSchema');
const Message = require('./models/msgSchema');
const { isResetTokenValid } = require("./authToken");
const apidata = require('./models/apidata')

// These Method is Used to Get Data and Cookies from FrontEnd
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})

// Registration
app.post('/api/register', async (req, res) => {
    try {
        // Get body or Data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username: username,
            email: email,
            password: password
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await createUser.save();
        console.log(created);
        res.status(200).send("Registered");

    } catch (error) {
        res.status(400).send(error)
    }
})

// Login User
app.post('/api/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find User if Exist
        const user = await Users.findOne({ email: email });
        if (user) {
            // Verify Password
            // console.log("user",user);
            const isMatch = await bcryptjs.compare(password, user.password);

            if (isMatch) {
                // Generate Token Which is Define in User Schema
                const token = await jwt.sign(
                    { userId: user._id },
                    process.env.SECRET_KEY,
                )

                // res.cookie("jwt", token, {
                //      // Expires Token in 24 Hours
                //     expires : new Date(Date.now() + 86400000),
                //     httpOnly : true
                // })
                res.status(200).json({ success: true, data: user, token: token })
            } else {
                res.status(400).send("Invalid Credentials");
            }
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

// Message
app.post('/api/message', async (req, res) => {
    try {
        // Get body or Data
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const sendMsg = new Message({
            name: name,
            email: email,
            message: message
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await sendMsg.save();
        console.log(created);
        res.status(200).send("Sent");

    } catch (error) {
        res.status(400).send(error)
    }
})

// Logout Page
app.get('/api/logout', (req, res) => {
    res.clearCookie("jwt", { path: '/' })
    res.status(200).send("User Logged Out")
})

app.post('/api/forgot_password', forgotPassword)

app.post("/reset-password", isResetTokenValid, resetPassword)


app.post("/update-password", resetUpdatePassword)

// api data
app.get('/api/apidata', async (req, res) => {
    let result = await apidata.find();
    console.log(result);
    res.send(result);

});




// Run Server 
app.listen(port, () => {
    console.log("Server is Listening")
})


// Our Backend is Done And Store Data in Database
// Now Its Time to Connect Front End With BackEnd