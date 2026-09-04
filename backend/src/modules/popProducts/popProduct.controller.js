const service = require("./popProduct.service");

exports.createProduct = async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getProducts = async (_, res) => {
  try {
    const products = await service.getAllProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await service.deleteProduct(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
