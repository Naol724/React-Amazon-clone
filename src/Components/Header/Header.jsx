import React, { useContext } from "react";
import Classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase/';

const Header = () => {
  const [{user, basket }, dispatch ] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item)=>{
    return item.amount + amount
  }, 0)

  return (
    <section className={Classes.fixed}>
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
            <BsSearch size={38} />
          </div>

          {/* Account + Cart Section */}
          <div className={Classes.order_container}>
            <div className={Classes.language}>
              <img src="https://flagcdn.com/w20/us.png" alt="lang" />
              <select>
                <option value="EN">EN</option>
              </select>
            </div>

            <Link to={!user && "/auth"}>
            <div>
            {
              user?( 
              <>
              <p>Hello {user?.email?.split("@")[0]}</p>
              <span onClick={() => auth.signOut()}>Sign Out</span>
              </>
            ):(
              <>
              <p>Hello, sign in</p>
              <span>Account & Lists</span>
              </>
              )}
            </div>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={Classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </section>
  );
};

export default Header;
