import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { FaFire, FaHeadset, FaGift, FaCreditCard, FaStore } from "react-icons/fa";
import Classes from "./Header.module.css";

const LowerHeader = () => {
  const menuItems = [
    { 
      name: "Today's Deals", 
      path: "/category/deals",
      icon: <FaFire />,
      description: "Limited-time offers & flash sales"
    },
    { 
      name: "Customer Service", 
      path: "/customer-service",
      icon: <FaHeadset />,
      description: "24/7 support & help center"
    }, 
    { 
      name: "Registry", 
      path: "/registry",
      icon: <FaGift />,
      description: "Wedding, baby & gift registries"
    },
    { 
      name: "Gift Cards", 
      path: "/gift-cards",
      icon: <FaCreditCard />,
      description: "Perfect gifts for everyone"
    },
    { 
      name: "Sell", 
      path: "/sell",
      icon: <FaStore />,
      description: "Start your business with us"
    }
  ];

  return (
    <div className={Classes.lower_container}>
      <ul>
        <li className={Classes.all_menu}>
          <MenuIcon />
          <span>All</span>
        </li>
        {menuItems.map((item, index) => (
          <li key={index} className={Classes.nav_item}>
            <Link 
              to={item.path} 
              className={Classes.nav_link}
              title={item.description}
            >
              <span className={Classes.nav_icon}>{item.icon}</span>
              <span className={Classes.nav_text}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowerHeader;
