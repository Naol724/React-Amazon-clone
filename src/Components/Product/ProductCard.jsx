import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Classes from "./Product.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product, flex, renderDesc }) {
  if (!product) return null; // protect from undefined

  const { id, image, title, rating, price, description } = product;

  return (
    <div
      className={`${Classes.card_container} ${
        flex ? Classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={Classes.img_container} />
      </Link>

      <div>
        <h3>{title}</h3>

        {renderDesc && <div>{description}</div>}

        <div className={Classes.rating}>
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <small>{rating?.count}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>

        <button className={Classes.button}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
