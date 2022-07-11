const routes = require("express").Router();
const productmanager = require('../manager/ordermanager');

routes.get('/', (req, res) => {
    const response = productmanager.getalldata();
    res.send(response)
});

module.exports = routes