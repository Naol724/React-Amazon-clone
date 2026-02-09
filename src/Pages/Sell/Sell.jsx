import React, { useEffect } from "react";
import Layout from "../../Components/LayOut/LayOut";
import classes from "./Sell.module.css";

function Sell() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sellingOptions = [
    {
      title: "Individual Seller",
      description: "Perfect for occasional sellers",
      price: "$0.99 per item sold",
      features: [
        "No monthly subscription fee",
        "Access to basic selling tools",
        "Customer service support",
        "Payment processing included"
      ],
      recommended: false
    },
    {
      title: "Professional Seller",
      description: "Best for businesses and frequent sellers",
      price: "$39.99 per month",
      features: [
        "No per-item fee",
        "Advanced selling tools",
        "Bulk listing tools",
        "Inventory management",
        "Advanced reporting",
        "API access"
      ],
      recommended: true
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", commission: "8%" },
    { name: "Books", icon: "📚", commission: "15%" },
    { name: "Clothing", icon: "👕", commission: "17%" },
    { name: "Home & Garden", icon: "🏠", commission: "15%" },
    { name: "Sports", icon: "⚽", commission: "15%" },
    { name: "Toys", icon: "🧸", commission: "15%" },
    { name: "Beauty", icon: "💄", commission: "8%" },
    { name: "Automotive", icon: "🚗", commission: "12%" }
  ];

  return (
    <Layout>
      <div className={classes.sell_container}>
        <div className={classes.sell_header}>
          <h1>Start Selling on Amazon</h1>
          <p>Reach millions of customers and grow your business</p>
          <button className={classes.get_started_btn}>Get Started</button>
        </div>

        {/* Selling Plans */}
        <section className={classes.plans_section}>
          <h2>Choose Your Selling Plan</h2>
          <div className={classes.plans_grid}>
            {sellingOptions.map((plan, index) => (
              <div key={index} className={`${classes.plan_card} ${plan.recommended ? classes.recommended : ''}`}>
                {plan.recommended && (
                  <div className={classes.recommended_badge}>Recommended</div>
                )}
                <h3>{plan.title}</h3>
                <p className={classes.plan_description}>{plan.description}</p>
                <div className={classes.plan_price}>{plan.price}</div>
                <ul className={classes.features_list}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={classes.choose_plan_btn}>Choose Plan</button>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className={classes.categories_section}>
          <h2>Popular Categories to Sell</h2>
          <div className={classes.categories_grid}>
            {categories.map((category, index) => (
              <div key={index} className={classes.category_card}>
                <div className={classes.category_icon}>{category.icon}</div>
                <h3>{category.name}</h3>
                <p>Commission: {category.commission}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Start */}
        <section className={classes.how_to_start}>
          <h2>How to Start Selling</h2>
          <div className={classes.steps_container}>
            <div className={classes.step}>
              <div className={classes.step_number}>1</div>
              <h3>Create Your Account</h3>
              <p>Sign up for a seller account and choose your selling plan</p>
            </div>
            <div className={classes.step}>
              <div className={classes.step_number}>2</div>
              <h3>List Your Products</h3>
              <p>Add your products with photos, descriptions, and pricing</p>
            </div>
            <div className={classes.step}>
              <div className={classes.step_number}>3</div>
              <h3>Start Selling</h3>
              <p>Receive orders, ship products, and get paid</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className={classes.benefits_section}>
          <h2>Why Sell on Amazon?</h2>
          <div className={classes.benefits_grid}>
            <div className={classes.benefit_item}>
              <div className={classes.benefit_icon}>🌍</div>
              <h3>Global Reach</h3>
              <p>Access to millions of customers worldwide</p>
            </div>
            <div className={classes.benefit_item}>
              <div className={classes.benefit_icon}>🚚</div>
              <h3>Fulfillment Options</h3>
              <p>Use Amazon's fulfillment network or ship yourself</p>
            </div>
            <div className={classes.benefit_item}>
              <div className={classes.benefit_icon}>📊</div>
              <h3>Analytics & Tools</h3>
              <p>Advanced tools to manage and grow your business</p>
            </div>
            <div className={classes.benefit_item}>
              <div className={classes.benefit_icon}>💰</div>
              <h3>Fast Payments</h3>
              <p>Get paid every 14 days with direct deposit</p>
            </div>
            <div className={classes.benefit_item}>
              <div className={classes.benefit_icon}>🛡️</div>
              <h3>Trust & Safety</h3>
              <p>Amazon's A-to-Z guarantee protects buyers and sellers</p>
            </div>
            <div className={classes.benefit_item}>
              <div className={classes.benefit_icon}>📞</div>
              <h3>24/7 Support</h3>
              <p>Get help when you need it with seller support</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={classes.cta_section}>
          <h2>Ready to Start Selling?</h2>
          <p>Join millions of sellers and start your Amazon business today</p>
          <button className={classes.start_selling_btn}>Start Selling Now</button>
        </section>
      </div>
    </Layout>
  );
}

export default Sell;