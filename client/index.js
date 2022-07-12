const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const links = require("./utils/links");

const app = express();

const PORT = 3030;
const serverURL = "https://nodeejsapi.herokuapp.com";
const baseURL = serverURL || "http://localhost:5001";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    renderPage(res, { title: "Product App Manager" })
});

/* ------------------- PRODUCT ------------------ */

app.get("/addproduct", async (req, res) => {
    const response = await axios.get(`${baseURL}/api/category`);
    renderPage(res, { name: "addproduct", title: "Add Product", args: { category: response.data } })
});

app.get("/viewproduct", async (req, res) => {
    const response = await axios.get(`${baseURL}/api/product`);
    renderPage(res, { name: "viewproduct", title: "View Product", args: { products: response.data, url: `${baseURL}/api/product` } })
});

app.post("/addnewproduct", async (req, res) => {
    await axios.post(`${baseURL}/api/product`, req.body);
    const response = await axios.get(`${baseURL}/api/category`);
    renderPage(res, { name: "addproduct", title: "Add Product", args: { category: response.data } })
});

app.get("/editproduct", async (req, res) => {
    const response = await axios.get(`${baseURL}/api/product`);
    const selectedRecord = response.data.find(f => f.id === parseInt(req.query.id))
    renderPage(res, {
        name: "editproduct", title: `Edit Product (${selectedRecord.name})`,
        args: { item: selectedRecord }
    })
});

app.post("/updateproduct", async (req, res) => {
    await axios.put(`${baseURL}/api/product`, req.body);
    const response = await axios.get(`${baseURL}/api/product`);
    renderPage(res, { name: "viewproduct", title: "View Product", args: { products: response.data, url: `${baseURL}/api/product` } })
});

/* ------------------- CATEGORY ------------------ */
app.get("/addcategory", async (req, res) => {
    renderPage(res, { name: "addcategory", title: "Add Category" })
});

app.post("/addnewcategory", async (req, res) => {
    await axios.post(`${baseURL}/api/category`, req.body);
    renderPage(res, { name: "addcategory", title: "Add Category" })
});

app.get("/viewcategory", async (req, res) => {
    const response = await axios.get(`${baseURL}/api/category`);
    renderPage(res, { name: "viewcategory", title: "View Category", args: { products: response.data, url: `${baseURL}/api/category` } })
});

app.get("/editcategory", async (req, res) => {
    const response = await axios.get(`${baseURL}/api/category`);
    const selectedRecord = response.data.find(f => f.id === parseInt(req.query.id))
    renderPage(res, {
        name: "editcategory", title: `Edit Category (${selectedRecord.name})`,
        args: { item: selectedRecord }
    })
});

app.post("/updatecategory", async (req, res) => {
    await axios.put(`${baseURL}/api/category`, req.body);
    const response = await axios.get(`${baseURL}/api/category`);
    renderPage(res, { name: "viewcategory", title: "View Category", args: { products: response.data, url: `${baseURL}/api/category` } })
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

app.listen(process.env.PORT || PORT, () => console.log(`server started at ${PORT} port`));
