import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from '../../Utility/action.Type';

function ProductCard({ product, flex, renderDesc, renderAdd }) {

  if (!product) {
    return null; // or <div>Loading...</div>
  }
  const { id, image, title, rating, price, description } = product;

  const [{ basket }, dispatch] = useContext(DataContext);

  const addToCart = () => {
  dispatch({
    type: Type.ADD_TO_BASKET,
    item: {
      image, title, id, rating, price, description
    }
      });
  };

  return (
    <div
      className={`${Classes.card_container} ${
        flex ? Classes.product_flexed : ""
      }`}
    >
      <div className={Classes.image_container}>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} className={Classes.img_container} />
        </Link>
      </div>

      <div className={Classes.content_container}>
        <Link to={`/products/${id}`} className={Classes.title_link}>
          <h3 className={Classes.head3}>{title}</h3>
        </Link>

        {renderDesc && (
          <p className={Classes.description}>{description || "No description available"}</p>
        )}

        <div className={Classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} size="small" />
          <small className={Classes.rating_count}>({rating?.count || 0})</small>
        </div>

        <div className={Classes.price_container}>
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button className={Classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
