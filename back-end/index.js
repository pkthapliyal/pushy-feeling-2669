const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors())


const { userRoute } = require("./routes/User.route")
const { productRoute } = require("./routes/Product.route")

app.use("/", userRoute)
app.use("/products", productRoute)

const connection = require("./db");

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Server is listening")
    } catch (error) {
        console.log(error)
    }

})