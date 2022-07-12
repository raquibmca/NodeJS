const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser');

const product = require("./routes/product")
const order = require("./routes/order")
const category = require("./routes/category")

const app = express();

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.get("/", (req, res) => {
    res.send("Hello all, Express is running...")
});

app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/category", category);

// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Something went wrong!";
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack,
//     });
// })

app.listen(process.env.PORT || 5001, () => {
    console.log('Listing on port 5001');
});
