import React, { useEffect } from "react";
import Layout from "../../Components/LayOut/LayOut";
import classes from "./Registry.module.css";

function Registry() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const registryTypes = [
    {
      title: "Wedding Registry",
      description: "Create your perfect wedding registry with gifts for every budget",
      icon: "💍",
      features: ["Free shipping", "Easy returns", "Thank you list management"]
    },
    {
      title: "Baby Registry",
      description: "Everything you need for your little one's arrival",
      icon: "👶",
      features: ["Completion discount", "Registry checklist", "Group gifting"]
    },
    {
      title: "Birthday Registry",
      description: "Make your birthday wishes come true",
      icon: "🎂",
      features: ["Surprise me option", "Age-appropriate suggestions", "Party planning tools"]
    },
    {
      title: "Holiday Registry",
      description: "Share your holiday wish list with family and friends",
      icon: "🎄",
      features: ["Seasonal suggestions", "Family sharing", "Budget tracking"]
    }
  ];

  return (
    <Layout>
      <div className={classes.registry_container}>
        <div className={classes.registry_header}>
          <h1>Gift Registry</h1>
          <p>Create and manage your gift registries for any occasion</p>
        </div>

        <section className={classes.registry_types}>
          <h2>Create a Registry</h2>
          <div className={classes.types_grid}>
            {registryTypes.map((type, index) => (
              <div key={index} className={classes.registry_card}>
                <div className={classes.registry_icon}>{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <ul className={classes.features_list}>
                  {type.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={classes.create_btn}>Create Registry</button>
              </div>
            ))}
          </div>
        </section>

        <section className={classes.how_it_works}>
          <h2>How It Works</h2>
          <div className={classes.steps_container}>
            <div className={classes.step}>
              <div className={classes.step_number}>1</div>
              <h3>Create Your Registry</h3>
              <p>Choose your registry type and add your favorite items</p>
            </div>
            <div className={classes.step}>
              <div className={classes.step_number}>2</div>
              <h3>Share with Friends</h3>
              <p>Send your registry link to family and friends</p>
            </div>
            <div className={classes.step}>
              <div className={classes.step_number}>3</div>
              <h3>Receive Gifts</h3>
              <p>Track purchases and send thank you notes</p>
            </div>
          </div>
        </section>

        <section className={classes.benefits}>
          <h2>Registry Benefits</h2>
          <div className={classes.benefits_grid}>
            <div className={classes.benefit_item}>
              <h3>🚚 Free Shipping</h3>
              <p>Free shipping on registry purchases over $25</p>
            </div>
            <div className={classes.benefit_item}>
              <h3>🔄 Easy Returns</h3>
              <p>Hassle-free returns and exchanges for registry gifts</p>
            </div>
            <div className={classes.benefit_item}>
              <h3>💰 Completion Discount</h3>
              <p>Get 15% off remaining items after your event</p>
            </div>
            <div className={classes.benefit_item}>
              <h3>📱 Mobile App</h3>
              <p>Manage your registry on-the-go with our mobile app</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Registry;