import React, { useContext, useState, useEffect } from 'react';
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
    const [{ user, basket }, dispatch] = useContext(DataContext);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);

    const total = basket?.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0);

    const [cardError, setCardError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Add timeout to prevent infinite loading
    React.useEffect(() => {
        if (processing) {
            const timeout = setTimeout(() => {
                console.log("Payment timeout - stopping loading state");
                setProcessing(false);
                setCardError("Payment is taking too long. Please check your orders or try again.");
            }, 30000); // 30 seconds timeout

            return () => clearTimeout(timeout);
        }
    }, [processing]);

    const handleChange = (e) => {
        e?.error?.message ? setCardError(e.error.message) : setCardError("");
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            setCardError("Stripe is not loaded. Please refresh the page.");
            return;
        }

        if (processing) {
            console.log("Payment already in progress, ignoring duplicate request");
            return;
        }

        try {
            setProcessing(true);
            setCardError("");

            console.log("=== PAYMENT FLOW START ===");
            console.log("Total amount:", total);
            
            // Fix floating point precision issue
            const totalInCents = Math.round(total * 100);
            console.log("Total in cents (rounded):", totalInCents);

            //1. Get client secret
            console.log("Step 1: Creating payment intent...");
            
            const response = await axiosInstance({
                method: "POST",
                url: `/payment/create?total=${totalInCents}`,
            });

            console.log("Payment intent response:", response.data);
            const clientSecret = response.data.clientSecret;

            if (!clientSecret) {
                throw new Error("No client secret received from server");
            }

            //2. Confirm payments
            console.log("Step 2: Confirming payment with Stripe...");
            console.log("Client secret:", clientSecret?.substring(0, 20) + "...");
            
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error("Card element not found");
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            console.log("Stripe confirmation result:");
            console.log("- PaymentIntent:", paymentIntent);
            console.log("- Error:", error);

            if (error) {
                console.error("Stripe payment error:", error);
                setCardError(`Payment failed: ${error.message}`);
                setProcessing(false);
                return;
            }

            if (!paymentIntent) {
                console.error("No payment intent returned from Stripe");
                setCardError("Payment failed: No payment intent returned");
                setProcessing(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log("Payment succeeded:", paymentIntent);
                
                try {
                    //3. Save order to Firebase
                    console.log("Step 3: Saving order to Firebase...");
                    console.log("User ID:", user.uid);
                    console.log("Payment Intent ID:", paymentIntent.id);
                    console.log("Basket items:", basket);
                    console.log("Order data:", {
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    });

                    // Check if order already exists to prevent duplicates
                    const existingOrder = await db
                        .collection("users")
                        .doc(user.uid)
                        .collection("orders")
                        .doc(paymentIntent.id)
                        .get();

                    if (existingOrder.exists) {
                        console.log("Order already exists, skipping save");
                    } else {
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

                        console.log("Order saved to Firebase successfully");
                    }
                } catch (firebaseError) {
                    console.error("Firebase save error:", firebaseError);
                    // Don't fail the entire payment flow if Firebase save fails
                    // The payment was successful, so we should still show success
                }

                //4. Clear the basket
                dispatch({
                    type: Type.EMPTY_BASKET
                });

                //5. Show success message
                setPaymentSuccess(true);
                setProcessing(false);

                //6. Redirect to orders after showing success (with fallback)
                const redirectTimer = setTimeout(() => {
                    console.log("Auto-redirecting to orders page...");
                    navigate("/orders", { 
                        state: { 
                            message: "Payment successful! Your order has been placed." 
                        }
                    });
                }, 3000);

                // Clear timer if component unmounts
                return () => clearTimeout(redirectTimer);
            } else {
                console.error("Payment intent status:", paymentIntent?.status);
                setCardError(`Payment was not completed. Status: ${paymentIntent?.status || 'unknown'}`);
                setProcessing(false);
            }

        } catch (error) {
            console.error("=== PAYMENT ERROR ===");
            console.error("Error details:", error);
            console.error("Error response:", error.response?.data);
            
            let errorMessage = "Payment failed. Please try again.";
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setCardError(errorMessage);
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
            <div className={Classes.items_section}>
                <h3>Review items and delivery</h3>
                <div className={Classes.items_container}>
                    {basket?.map((item) => {
                        console.log("Payment item:", item);
                        return (
                    <ProductCard 
                        key={item.id} 
                        product={item} 
                        flex={true}
                        renderDesc={true}
                        renderAdd={false} />
                    );
                    })}
                </div>
            </div>

                <hr />

    {/* Payment */}
<div className={Classes.flex}>
    <h3>Payment method</h3>

    <div className={Classes.Payment_card_container}>
        <div className={Classes.Payment_details}>
        
        {/* Success Message */}
        {paymentSuccess && (
            <div style={{ 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                padding: '20px', 
                borderRadius: '5px', 
                marginBottom: '20px',
                border: '1px solid #c3e6cb',
                textAlign: 'center'
            }}>
                <h3>🎉 Payment Successful!</h3>
                <p>Thank you for your order. You will be redirected automatically in a few seconds.</p>
                <button 
                    onClick={() => navigate("/orders", { 
                        state: { 
                            message: "Payment successful! Your order has been placed." 
                        }
                    })}
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    View My Orders
                </button>
            </div>
        )}

        <form onSubmit={handlePayment}>
            {/* {error} */}
            {cardError && (
                <small style={{ color: 'red', display: 'block', marginBottom: '10px' }}>
                    {cardError}
                </small>
            )}
                
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

                <button type="submit" disabled={processing || paymentSuccess || !stripe}>
                    {processing ? (
                    <div className={Classes.loading}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please wait...</p>
                    </div>
                    ) : paymentSuccess ? (
                        "Payment Successful ✓"
                    ) : (
                        "Pay now"
                    )}
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
