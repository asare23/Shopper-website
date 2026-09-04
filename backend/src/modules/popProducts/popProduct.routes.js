const router = require("express").Router();
const controller = require("./popProduct.controller");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);
router.post("/", controller.createProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
