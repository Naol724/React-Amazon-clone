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
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={Classes.products_container}>
          {Products.map((singleProduct) => {
            return <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id}  />
          })
        }
        </section>
      )}
    </>
  );
}

export default Product;
