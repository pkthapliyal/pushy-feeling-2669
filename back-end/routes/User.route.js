const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

const { UserModel } = require("../models/user.model");

userRoute.post("/signup", async (req, res) => {

    const { email, first_name, last_name, dob, mobile, user_name, password } = req.body;
    user = await UserModel.findOne({ email: email });
    if (user) {
        return res.status(404).send({ "message": "User already registered !" });
    }

    bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
            return res.status(404).send({ "message": err.message });
        }
        user = UserModel({ email, first_name, last_name, dob, mobile, user_name, password: hash });
        await user.save();
        res.status(200).send({ "message": "User login Successfully" });
    })
})

// Sign up ;
userRoute.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ "message": "Wrong credentials !" });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
        if (!result) {
            return res.status(404).send({ "message": "Wrong password !" });
        }
        else if (err) {
            return res.status(404).send({ "message": err.message });
        }
        let payload = { userID: user._id, email: user.email }
        let token = jwt.sign(payload, "secretKey");
        console.log(token)
        res.status(200).send({ "token": token })

    })


})






module.exports = { userRoute }
