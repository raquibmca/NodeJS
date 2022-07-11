const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const links = require("./utils/links");

const app = express();

const PORT = 3030
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    renderPage(res, { title: "Product App Manager" })
});

/* ------------------- PRODUCT ------------------ */

app.get("/addproduct", async (req, res) => {
    const response = await axios.get("http://localhost:5001/api/category");
    renderPage(res, { name: "addproduct", title: "Add Product", args: { category: response.data } })
});

app.get("/viewproduct", async (req, res) => {
    const response = await axios.get("http://localhost:5001/api/product");
    renderPage(res, { name: "viewproduct", title: "View Product", args: { products: response.data } })
});

app.post("/addnewproduct", async (req, res) => {
    await axios.post("http://localhost:5001/api/product", req.body);
    const response = await axios.get("http://localhost:5001/api/category");
    renderPage(res, { name: "addproduct", title: "Add Product", args: { category: response.data } })
});

app.get("/editproduct", async (req, res) => {
    const response = await axios.get("http://localhost:5001/api/product");
    const selectedRecord = response.data.find(f => f.id === parseInt(req.query.id))
    renderPage(res, {
        name: "editproduct", title: `Edit Product (${selectedRecord.name})`,
        args: { item: selectedRecord }
    })
});

app.post("/updateproduct", async (req, res) => {
    await axios.put("http://localhost:5001/api/product", req.body);
    const response = await axios.get("http://localhost:5001/api/product");
    renderPage(res, { name: "viewproduct", title: "View Product", args: { products: response.data } })
});

/* ------------------- CATEGORY ------------------ */
app.get("/addcategory", async (req, res) => {
    renderPage(res, { name: "addcategory", title: "Add Category" })
});

app.post("/addnewcategory", async (req, res) => {
    await axios.post("http://localhost:5001/api/category", req.body);
    renderPage(res, { name: "addcategory", title: "Add Category" })
});

app.get("/viewcategory", async (req, res) => {
    const response = await axios.get("http://localhost:5001/api/category");
    renderPage(res, { name: "viewcategory", title: "View Category", args: { products: response.data } })
});

app.get("/editcategory", async (req, res) => {
    const response = await axios.get("http://localhost:5001/api/category");
    const selectedRecord = response.data.find(f => f.id === parseInt(req.query.id))
    renderPage(res, {
        name: "editcategory", title: `Edit Category (${selectedRecord.name})`,
        args: { item: selectedRecord }
    })
});

app.post("/updatecategory", async (req, res) => {
    await axios.put("http://localhost:5001/api/category", req.body);
    const response = await axios.get("http://localhost:5001/api/category");
    renderPage(res, { name: "viewcategory", title: "View Category", args: { products: response.data } })
});

const renderPage = (res, dataObj) => {
    const { name, title, args } = dataObj;
    res.render("index", {
        page:
        {
            name,
            title,
            args,
            links
        }
    });
}

app.listen(PORT, () => console.log(`server started at ${PORT} port`));
