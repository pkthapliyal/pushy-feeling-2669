const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cartRoute = express.Router();
const { CartModel } = require("../models/cart.model")
const { ProductModel } = require("../models/product.model")


cartRoute.get("/", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {
        if (err) {
            return res.status(404).send({ "message": error.message })
        }
        console.log(decoded)
    })
})

cartRoute.post("/:id", async (req, res) => {

    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {

        if (decoded) {
            const productID = req.params.id;
            const userID = decoded.userID;
            const email = decoded.email;

            product = await CartModel.findOne({ userID: userID })

            if (!product) {
                const cartItem = [productID]
                item = CartModel({ userID, email, cartItem })
                await item.save();
                return res.status(200).send({ "message": `Item has been added to cart ` })
                return
            }

            let item = await CartModel.findOne({ userID: userID }, { cartItem: { $elemMatch: { $eq: productID } } })
            if (item.cartItem.length == 0) {
                console.log("YEs")
            }
            // else if (product[0].cartItem != 0) {
            //     return res.status(200).send({ "message": `Item is already in cart` })
            // }

            // await ProductModel.updateOne({ userID: userID }, { $addToSet: { cartItem: { $each: [productID] } } })
            return
            // else if (product[0].cartItem.length != 0) {
            //     await ProductModel.updateOne({ userID: userID }, { $push: { cartItem: productID } })
            //     return res.status(200).send({ "message": `Item has been added to cart ` })
            // }


            // if (product) {
            //     return res.status(200).send({ "message": `Item is already in cart ` })
            // }


            return res.send()

            // item = CartModel({ userID, email, cartItem })
            // await item.save();

            // Item = await ProductModel.findById({ _id: id })
            // return res.status(200).send({ "message": `${Item.title} has been added to cart ` })
        }
        else {
            return res.status(404).send({ "message": error.message })
        }
    })

})

module.exports = { cartRoute }