const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const orderRoute = express.Router();

const { UserModel } = require("../models/user.model")
const { ProductModel } = require("../models/product.model");
const { AddressModel } = require("../models/address.model")
const { OrderModel } = require("../models/order.model")

// orderRoute.get("/", async (req, res) => {
//     const token = req.headers.authorization;
//     tokenvalue = token.replace("Bearer ", "")
//     jwt.verify(tokenvalue, "secretKey", async (err, decoded) => {
//         // if (decoded) {
//         //     user = await AddressModel.findOne({ userID: decoded.userID })
//         //     if (!user.addressData) {
//         //         return res.status(200).send({ "message": "you have not updated any" })
//         //     }

//         //     return res.status(200).send(user.addressData)

//         // }
//         // return res.status(404).send({ "message": err })
//         res.send()

//     })
//     res.send()
// })

orderRoute.get("/", async (req, res) => {
    orderList = await OrderModel.find()
    return res.status(200).send(orderList)
})


//  getting method

orderRoute.post("/add", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {
        if (decoded) {
            const userID = decoded.userID;
            const email = decoded.email;

            req.body.userID = userID;
            req.body.email = email;

            order = await OrderModel(req.body)
            await order.save();
            return res.status(200).send({ "message": `Your order has been placed successfully !` })
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })
})




module.exports = { orderRoute }

