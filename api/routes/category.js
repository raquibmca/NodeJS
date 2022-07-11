const routes = require("express").Router();
const categorymanager = require('../manager/categorymanager')


routes.get('/', (req, res) => {
    const response = categorymanager.getalldata();
    res.send(response)
});

routes.post("/", (req, res) => {
    if (!req.body.id) req.body.id = categorymanager.getnewid()
    const isSucess = categorymanager.savedata(req.body);
    res.send(isSucess)
});

routes.put("/", (req, res) => {
    req.body.id = parseInt(req.body.id)
    const isSucess = categorymanager.updatedata(req.body);
    res.send(isSucess)
});

routes.delete('/:id', (req, res) => {
    const isSucess = categorymanager.deletedata(req.params.id);
    res.send(isSucess)
});

routes.get('/:id', (req, res) => {
    const product = products.find(f => f.id === parseInt(req.params.id));
    if (product)
        return res.send(product);
    res.status(500).send("Category not found.")
});

module.exports = routes;