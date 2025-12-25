const { onRequest } = require("firebase-functions/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

setGlobalOptions({ maxInstances: 10 });

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "success!" });
});

app.post("/payment/create", async (req, res) => {
    try {
        const total = parseInt(req.query.total);

        if (!total || total <= 0) {
            return res.status(400).json({ message: "Total must be greater than 0" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });

        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error creating payment intent" });
    }
});

exports.api = onRequest(app);
