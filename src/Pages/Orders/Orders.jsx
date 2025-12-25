import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    // users/{uid}/orders
    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orderContainer}>
          <h2>Your Orders</h2>

          {orders.length === 0 && (
            <p style={{ padding: "20px" }}>No orders found</p>
          )}

          {orders.map((order) => (
            <div key={order.id}>
              <hr />
              <p>Order ID: {order.id}</p>

              {order.data.basket.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  rate={item.rate}
                  count={item.count}
                  price={item.price}
                  renderAdd={true}
                  flex={true}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
