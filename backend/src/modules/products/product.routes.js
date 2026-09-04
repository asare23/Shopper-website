const router = require("express").Router();
const controller = require("./product.controller");

router.get("/", controller.getAll);
router.get("/category/:category", controller.getByCategory);

module.exports = router;
