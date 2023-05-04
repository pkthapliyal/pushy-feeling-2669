const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productRoute = express.Router();

const { ProductModel } = require("../models/product.model");

productRoute.get("/", async (req, res) => {
    products = await ProductModel.find()
    res.send(products)
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


module.exports = { productRoute }