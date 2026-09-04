const service = require("./newProduct.service");

exports.getAll = async (req, res) => {
  try {
    const products = await service.getAllNewProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
