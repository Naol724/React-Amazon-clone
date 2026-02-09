import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";

import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useContext(DataContext);
  const location = useLocation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Check if redirected from payment with success message
    if (location.state?.message) {
      setShowSuccessMessage(true);
      // Hide message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [location]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    console.log("Fetching orders for user:", user.uid);

    // Use compat version to match Payment component
    const unsubscribe = db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        console.log("Orders snapshot received:", snapshot.docs.length, "orders");
        setOrders(
          snapshot.docs.map((doc) => {
            console.log("Order data:", doc.id, doc.data());
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      }, (error) => {
        console.error("Error fetching orders:", error);
      });

    return () => unsubscribe();
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orderContainer}>
          
          {/* Success Message */}
          {showSuccessMessage && (
            <div style={{ 
              backgroundColor: '#d4edda', 
              color: '#155724', 
              padding: '15px', 
              borderRadius: '5px', 
              marginBottom: '20px',
              border: '1px solid #c3e6cb',
              textAlign: 'center'
            }}>
              <h3>🎉 {location.state?.message}</h3>
            </div>
          )}

          <h2>Your Orders</h2>

          {orders.length === 0 && (
            <p style={{ padding: "20px" }}>No orders found</p>
          )}

          {orders.map((order) => (
            <div key={order.id} className={classes.order_item}>
              <div className={classes.order_header}>
                <div className={classes.order_info}>
                  <h3>Order #{order.id.slice(-8)}</h3>
                  <p className={classes.order_date}>
                    {new Date(order.data.created * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div className={classes.order_total}>
                  <span className={classes.total_label}>Total:</span>
                  <span className={classes.total_amount}>
                    ${(order.data.amount / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={classes.order_items}>
                {order.data.basket?.map((item, index) => {
                  // Ensure the item has the correct structure for ProductCard
                  const productData = {
                    id: item.id,
                    image: item.image,
                    title: item.title,
                    rating: item.rating || item.rate || { rate: 0, count: 0 },
                    price: item.price,
                    description: item.description,
                    amount: item.amount // quantity
                  };

                  return (
                    <div key={index} className={classes.order_product}>
                      <ProductCard
                        product={productData}
                        flex={true}
                        renderDesc={true}
                        renderAdd={false}
                      />
                      <div className={classes.quantity_info}>
                        <span className={classes.quantity_label}>Qty:</span>
                        <span className={classes.quantity_value}>{item.amount}</span>
                        <span className={classes.item_total}>
                          ${(item.price * item.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                }) || <p className={classes.no_items}>No items in this order</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
