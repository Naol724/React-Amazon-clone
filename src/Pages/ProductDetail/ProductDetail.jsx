import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../Components/LayOut/LayOut";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/Product/ProductCard";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  const API_URL = import.meta.env.VITE_API_URL || "https://fakestoreapi.com";

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${API_URL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching product:", err);
        setIsLoading(false);
      });
  }, [productId, API_URL]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} renderDesc={true} />
      )}
    </LayOut>
  );
};

export default ProductDetail;
