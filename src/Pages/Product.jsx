import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { fetchAllProducts } from "../Services/products.service";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetchAllProducts().then((products) => {
      if (isMounted) {
        const selectedProduct = products.find(
          (item) => String(item.id) === String(productId),
        );
        setProduct(selectedProduct || null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [location.state, productId]);

  if (loading) {
    return <div className="loading-state">Loading product...</div>;
  }

  if (!product) {
    return <div className="loading-state">Product not found.</div>;
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
