import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ProductCard from "./ProductCard";
import Classes from "./Product.module.css";

function Product() {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={Classes.products_container}>
          {Products.map((singleProduct) => (
            <ProductCard key={singleProduct.id} product={singleProduct} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
