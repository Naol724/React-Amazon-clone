import React, { useContext, useState } from "react";
import Classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase/';

const Header = () => {
  const [{user, basket }, dispatch ] = useContext(DataContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const totalItem = basket?.reduce((amount, item)=>{
    return item.amount + amount
  }, 0)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSignOut = () => {
    auth.signOut();
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to results page with search query
      navigate(`/category/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <section className={Classes.fixed}>
      <section>
        <div className={Classes.header_container}>
          {/* Mobile Menu Button */}
          <button 
            className={Classes.mobile_menu_btn}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
          </button>

          {/* Logo Section */}
          <div className={Classes.logo_container}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            <div className={Classes.delivery}>
              <SlLocationPin size={18} />
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Section - Desktop */}
          <form className={`${Classes.search} ${Classes.desktop_search}`} onSubmit={handleSearch}>
            <select className={Classes.search_category}>
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
            <input 
              type="text" 
              placeholder="Search Amazon" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={Classes.search_input}
            />
            <button type="submit" className={Classes.search_btn}>
              <BsSearch size={20} />
            </button>
          </form>

          {/* Mobile Search Button */}
          <button 
            className={Classes.mobile_search_btn}
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <BsSearch size={20} />
          </button>

          {/* Account + Cart Section */}
          <div className={Classes.order_container}>
            <div className={Classes.language}>
              <img src="https://flagcdn.com/w20/us.png" alt="US Flag" />
              <select>
                <option value="EN">EN</option>
                <option value="ES">ES</option>
                <option value="FR">FR</option>
              </select>
            </div>

            {user ? (
              <div className={Classes.account_link}>
                <div>
                  <p>Hello, {user?.email?.split("@")[0]}</p>
                  <span onClick={handleSignOut} style={{ cursor: 'pointer' }}>Sign Out</span>
                </div>
              </div>
            ) : (
              <Link to="/auth" className={Classes.account_link}>
                <div>
                  <p>Hello, sign in</p>
                  <span>Account & Lists</span>
                </div>
              </Link>
            )}

            <Link to="/orders" className={Classes.orders_link}>
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            <Link to="/cart" className={Classes.cart}>
              <BiCart size={35} />
              <span className={Classes.cart_count}>{totalItem}</span>
              <span className={Classes.cart_text}>Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className={Classes.mobile_search}>
            <form className={Classes.search} onSubmit={handleSearch}>
              <select className={Classes.search_category}>
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
              <input 
                type="text" 
                placeholder="Search Amazon" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={Classes.search_input}
                autoFocus
              />
              <button type="submit" className={Classes.search_btn}>
                <BsSearch size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={Classes.mobile_menu}>
            <div className={Classes.mobile_menu_content}>
              <div className={Classes.mobile_user_info}>
                {user ? (
                  <div>
                    <p className={Classes.user_greeting}>Hello, {user?.email?.split("@")[0]}</p>
                    <button onClick={handleSignOut} className={Classes.sign_out_btn}>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={handleMobileLinkClick} className={Classes.sign_in_link}>
                    <p>Hello, sign in</p>
                    <span>Account & Lists</span>
                  </Link>
                )}
              </div>
              
              <div className={Classes.mobile_menu_links}>
                <Link to="/orders" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Your Orders</span>
                </Link>
                <Link to="/cart" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Your Cart ({totalItem})</span>
                </Link>
                <Link to="/category/deals" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Today's Deals</span>
                </Link>
                <Link to="/customer-service" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Customer Service</span>
                </Link>
                <Link to="/registry" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Registry</span>
                </Link>
                <Link to="/gift-cards" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Gift Cards</span>
                </Link>
                <Link to="/sell" onClick={handleMobileLinkClick} className={Classes.mobile_link}>
                  <span>Sell</span>
                </Link>
                <div className={Classes.mobile_language}>
                  <img src="https://flagcdn.com/w20/us.png" alt="US Flag" />
                  <select>
                    <option value="EN">English</option>
                    <option value="ES">Español</option>
                    <option value="FR">Français</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <LowerHeader />
    </section>
  );
};

export default Header;
