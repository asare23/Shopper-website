const service = require("./product.service");

exports.getAll = async (req, res) => {
  try {
    const products = await service.getAllProducts();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await service.getProductsByCategory(category);

    res.status(200).json({
      success: true,
      category,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
