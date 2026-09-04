const router = require('express').Router();
const controller = require('./newProduct.controller');

router.get('/', controller.getAll);

module.exports = router;
