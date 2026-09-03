import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import { useLocation, useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { fetchAllProducts } from "../Services/products.service";

const Product = () => {
  const { all_product = [] } = useContext(ShopContext);
  const { productId } = useParams();
  const location = useLocation();
  const selectedProduct = location.state?.product;
  const [product, setProduct] = useState(
    () =>
      selectedProduct ||
      all_product.find((item) => Number(item.id) === Number(productId)),
  );
  const [loading, setLoading] = useState(!selectedProduct && !product);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      const products = await fetchAllProducts();
      setProduct(
        products.find((item) => Number(item.id) === Number(productId)),
      );
      setLoading(false);
    };

    if (!product) {
      loadProduct();
    }
  }, [product, productId, selectedProduct]);

  if (loading) {
    return <div className="prod product-not-found">Loading product...</div>;
  }

  if (!product) {
    return <div className="prod product-not-found">Product not found.</div>;
  }
  return (
    <div className="prod">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
