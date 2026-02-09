import React, { useState, useEffect, useContext } from "react";
import Layout from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.Type";
import axios from "axios";
import classes from "./Deals.module.css";

function Deals() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(DataContext);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (product) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image: product.image,
        title: product.title,
        id: product.id,
        rating: product.rating,
        price: product.price,
        description: product.description
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    // Get products and simulate deals with discounted prices
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // Simulate deals by adding discount to products
        const dealsData = res.data.map(product => ({
          ...product,
          originalPrice: product.price,
          price: Math.round((product.price * 0.7) * 100) / 100, // 30% off
          discount: 30,
          dealEndTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Random end time within 7 days
        }));
        setDeals(dealsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const formatTimeLeft = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return "Deal Expired";
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <Layout>
      <div className={classes.deals_container}>
        <div className={classes.deals_header}>
          <h1>Today's Deals</h1>
          <p>Save big on top products with limited-time offers</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.deals_grid}>
            {deals.map((deal) => (
              <div key={deal.id} className={classes.deal_item}>
                <div className={classes.deal_badge}>
                  <span className={classes.discount_percent}>{deal.discount}% OFF</span>
                  <span className={classes.time_left}>{formatTimeLeft(deal.dealEndTime)}</span>
                </div>
                
                <div className={classes.deal_image_container}>
                  <img src={deal.image} alt={deal.title} className={classes.deal_image} />
                </div>
                
                <div className={classes.deal_content}>
                  <h3 className={classes.deal_title}>{deal.title}</h3>
                  <div className={classes.deal_rating}>
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className={classes.rating_count}>({Math.floor(Math.random() * 1000)})</span>
                  </div>
                </div>
                
                <div className={classes.price_info}>
                  <span className={classes.deal_price}>${deal.price}</span>
                  <span className={classes.original_price}>${deal.originalPrice}</span>
                </div>
                
                <button 
                  className={classes.add_to_cart_btn}
                  onClick={() => addToCart(deal)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Deals;