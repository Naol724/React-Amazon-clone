import React, { useState, useEffect } from "react";
import Layout from "../../Components/LayOut/LayOut";
import classes from "./GiftCards.module.css";

function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedDesign, setSelectedDesign] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const amounts = [25, 50, 100, 200];
  
  const designs = [
    { name: "Birthday", image: "🎂", color: "#ff6b6b" },
    { name: "Thank You", image: "🙏", color: "#4ecdc4" },
    { name: "Congratulations", image: "🎉", color: "#45b7d1" },
    { name: "Holiday", image: "🎄", color: "#96ceb4" },
    { name: "Love", image: "❤️", color: "#f8b500" },
    { name: "General", image: "🎁", color: "#6c5ce7" }
  ];

  return (
    <Layout>
      <div className={classes.giftcards_container}>
        <div className={classes.giftcards_header}>
          <h1>Amazon Gift Cards</h1>
          <p>The perfect gift for any occasion - delivered instantly</p>
        </div>

        <div className={classes.giftcard_builder}>
          <div className={classes.builder_section}>
            <h2>Create Your Gift Card</h2>
            
            {/* Design Selection */}
            <div className={classes.design_section}>
              <h3>Choose a Design</h3>
              <div className={classes.designs_grid}>
                {designs.map((design, index) => (
                  <div 
                    key={index}
                    className={`${classes.design_card} ${selectedDesign === index ? classes.selected : ''}`}
                    onClick={() => setSelectedDesign(index)}
                    style={{ backgroundColor: design.color }}
                  >
                    <div className={classes.design_icon}>{design.image}</div>
                    <span>{design.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div className={classes.amount_section}>
              <h3>Select Amount</h3>
              <div className={classes.amounts_grid}>
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    className={`${classes.amount_btn} ${selectedAmount === amount ? classes.selected : ''}`}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div className={classes.custom_amount}>
                <label htmlFor="custom">Or enter custom amount:</label>
                <input
                  type="number"
                  id="custom"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  min="1"
                  max="2000"
                />
              </div>
            </div>

            {/* Personalization */}
            <div className={classes.personalization_section}>
              <h3>Personalize Your Gift</h3>
              <div className={classes.form_group}>
                <label htmlFor="recipient">Recipient Name</label>
                <input type="text" id="recipient" placeholder="Enter recipient's name" />
              </div>
              
              <div className={classes.form_group}>
                <label htmlFor="sender">From</label>
                <input type="text" id="sender" placeholder="Your name" />
              </div>
              
              <div className={classes.form_group}>
                <label htmlFor="message">Personal Message</label>
                <textarea 
                  id="message" 
                  placeholder="Add a personal message (optional)"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <button className={classes.add_to_cart_btn}>
              Add to Cart - ${customAmount || selectedAmount}
            </button>
          </div>

          {/* Preview */}
          <div className={classes.preview_section}>
            <h3>Preview</h3>
            <div 
              className={classes.giftcard_preview}
              style={{ backgroundColor: designs[selectedDesign].color }}
            >
              <div className={classes.preview_header}>
                <span className={classes.amazon_logo}>amazon</span>
                <span className={classes.gift_card_text}>Gift Card</span>
              </div>
              
              <div className={classes.preview_design}>
                <div className={classes.preview_icon}>
                  {designs[selectedDesign].image}
                </div>
                <div className={classes.preview_amount}>
                  ${customAmount || selectedAmount}
                </div>
              </div>
              
              <div className={classes.preview_footer}>
                <span>{designs[selectedDesign].name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className={classes.features_section}>
          <h2>Why Choose Amazon Gift Cards?</h2>
          <div className={classes.features_grid}>
            <div className={classes.feature_item}>
              <div className={classes.feature_icon}>⚡</div>
              <h3>Instant Delivery</h3>
              <p>Delivered via email within minutes of purchase</p>
            </div>
            <div className={classes.feature_item}>
              <div className={classes.feature_icon}>🔄</div>
              <h3>Never Expires</h3>
              <p>Gift cards never expire and can be used anytime</p>
            </div>
            <div className={classes.feature_item}>
              <div className={classes.feature_icon}>🛍️</div>
              <h3>Millions of Items</h3>
              <p>Use on millions of items across all categories</p>
            </div>
            <div className={classes.feature_item}>
              <div className={classes.feature_icon}>📱</div>
              <h3>Easy to Use</h3>
              <p>Simple redemption process on any device</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default GiftCards;