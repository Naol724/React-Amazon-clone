import React from "react";
import Classes from "./Header.module.css";
import { Link } from "react-router-dom";

import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <section>
        <div className={Classes.header_container}>
          {/* Logo Section */}
          <div className={Classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            <div className={Classes.delivery}>
              <SlLocationPin size={18} />
              <div>
                <p>Delivery</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className={Classes.search}>
            <select>
              <option value="">All</option>
            </select>

            <input type="text" placeholder="Search product" />

            <BsSearch size={25} />
          </div>

          {/* Account + Cart Section */}
          <div className={Classes.order_container}>
            <div className={Classes.language}>
              <img src="https://flagcdn.com/w20/us.png" alt="lang" />
              <select>
                <option value="EN">EN</option>
              </select>
            </div>

            <Link to="/auth">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={Classes.cart}>
              <BiCart size={35} />
              <span>0</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </>
  );
};

export default Header;
