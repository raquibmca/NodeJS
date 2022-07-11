const routes = require("express").Router();
const productmanager = require('../manager/productmanager')


routes.get('/', (req, res) => {
    const response = productmanager.getalldata();
    res.send(response)
});

routes.post("/", (req, res) => {
    if (!req.body.id) req.body.id = productmanager.getnewid()
    const isSucess = productmanager.savedata(req.body);
    res.send(isSucess)
});

routes.put("/", (req, res) => {
    req.body.id = parseInt(req.body.id)
    const isSucess = productmanager.updatedata(req.body);
    res.send(isSucess)
});

routes.delete('/:id', (req, res) => {
    const isSucess = productmanager.deletedata(req.params.id);
    res.send(isSucess)
});

routes.get('/:id', (req, res) => {
    const product = products.find(f => f.id === parseInt(req.params.id));
    if (product)
        return res.send(product);
    res.status(500).send("Product not found.")
});

routes.get('/:id/:pname', (req, res) => {
    console.log('Tablet 900'.indexOf('Tab'))
    const product = products.find(f => (f.id === parseInt(req.params.id) &&
        f.name.toLowerCase().indexOf(req.params.pname.toLowerCase()) > -1));
    if (product)
        return res.send(product);
    res.status(500).send("Product not found.")
});

module.exports = routes;