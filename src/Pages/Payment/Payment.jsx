import React, { useContext, useState } from 'react';
import Classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { db } from "../../Utility/firebase";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Type } from "../../Utility/action.Type";

function Payment() {
    const [{ user, basket }] = useContext(DataContext);

    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);

    const total = basket?.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0);

    const [cardError, setCardError] = useState("");
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleChange = (e) => {
        e?.error?.message ? setCardError(e.error.message) : setCardError("");
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        

        try {
            setProcessing(true);

            //1. Get client secret
            const response = await axiosInstance({
                method: "POST",
                url: `/payment/create?total=${total * 100}`,
            });

            const clientSecret = response.data.clientSecret;

            //2. Confirm payments
            const { paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                    
                }
            );

            //Save order
            await db
                .collection("users")
                .doc(user.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });
        

            setProcessing(false);
            navigate("/orders");

        } catch (error) {
            console.error(error);
            setProcessing(false);
        }
    };

return (
    <LayOut>
        <div className={Classes.payment_header}>
            Checkout ({totalItem}) items
        </div>

        <section className={Classes.payment_section}>

        {/* Address */}
            <div className={Classes.flex}>
                <h3>Delivery Address</h3>
                <div>
                    <div>{user?.email}</div>
                    <div>123 React Lane</div>
                    <div>Chicago, IT</div>
                </div>
            </div>

                <hr />

                {/* Items */}
            <div className={Classes.flex}>
                <h3>Review items and delivery</h3>
                <div>
                    {basket?.map((item) => (
                    <ProductCard 
                        key={item.id} 
                        product={item} 
                        flex={true} />
                    ))}
                </div>
            </div>

                <hr />

    {/* Payment */}
<div className={Classes.flex}>
    <h3>Payment method</h3>

    <div className={Classes.Payment_card_container}>
        <div className={Classes.Payment_details}>
        <form onSubmit={handlePayment}>
            {/* {error} */}
            {cardError && (
                <small style={{ color: 'red' }}>{cardError}</small>)}
                
            {/* {card element} */}
            <CardElement onChange={handleChange} />

            {/* {price} */}
            <div className={Classes.payment_price}>
                <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total order |</p>
                    <CurrencyFormat amount={total} />
                    </span>
                </div>

                <button type="submit">
                    {processing ? (
                    <div className={Classes.loading}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please wait...</p>
                    </div>
                    ) :( "Pay now")}
                </button>
            </div>
        </form>
        </div>
        </div>
    </div>
</section>
</LayOut>
);
}

export default Payment;
