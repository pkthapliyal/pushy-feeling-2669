const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productRoute = express.Router();

const { ProductModel } = require("../models/product.model");

productRoute.get("/", async (req, res) => {

    try {
        // if (req.query.id) {
        //     products = await ProductModel.findById({ _id: req.params.id })
        //     return res.send(products)
        // }
        const { sort_arival } = req.query
        if (sort_arival) {
            products = await ProductModel.find().sort({ arival: 1 })
            return res.send(products)
        }
        const { search } = req.query
        if (search) {

            products = await ProductModel.find({ description: { $regex: search, $options: "i" } })

            if (products.length == 0) {

                return res.status(404).send({ "message": "try something else" })
            }

            return res.send(products)
        }


        products = await ProductModel.find()
        return res.send(products)

    } catch (error) {
        res.status(404).send(error.message)

    }

})

// Product by id ;
productRoute.get("/:id", async (req, res) => {
    // console.log(req.params.id)
    products = await ProductModel.findById({ _id: req.params.id })
    return res.send(products)

})


productRoute.post("/", async (req, res) => {
    const { title, gender, category, style, rating, rating_count, price, image, available, item_left, description } = req.body;

    try {
        product = ProductModel(req.body)
        await product.save();
        res.status(200).send({ "message": "One product has been added " })

    } catch (error) {

        console.log(error.message)
        res.status(404).send({ "message": error.message })

    }

    // res.status(200).send({ "message": "Product has been added " })
})


//   all user product routes are here -- > /


productRoute.get("/user", async (req, res) => {
    const token = req.headers.authorization;
    tokenvalue = token.replace("Bearer ", "")
    jwt.verify(tokenvalue, "secretKey", async (error, decoded) => {
        if (err) {
            return res.status(404).send({ "message": error.message })
        }
        console.log(decoded)
    })

})


module.exports = { productRoute }