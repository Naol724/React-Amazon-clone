import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: [
        { name: "About Amazon", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press Releases", path: "/press" },
        { name: "Amazon Science", path: "/science" }
      ]
    },
    {
      title: "Make Money with Us",
      links: [
        { name: "Sell on Amazon", path: "/sell" },
        { name: "Sell apps on Amazon", path: "/sell-apps" },
        { name: "Become an Affiliate", path: "/affiliate" },
        { name: "Advertise Your Products", path: "/advertise" }
      ]
    },
    {
      title: "Amazon Payment Products",
      links: [
        { name: "Amazon Business Card", path: "/business-card" },
        { name: "Shop with Points", path: "/points" },
        { name: "Reload Your Balance", path: "/reload" },
        { name: "Amazon Currency Converter", path: "/currency" }
      ]
    },
    {
      title: "Let Us Help You",
      links: [
        { name: "Your Account", path: "/auth" },
        { name: "Your Orders", path: "/orders" },
        { name: "Shipping Rates & Policies", path: "/shipping" },
        { name: "Returns & Replacements", path: "/returns" },
        { name: "Amazon Assistant", path: "/assistant" },
        { name: "Help", path: "/customer-service" }
      ]
    }
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" }
  ];

  const countries = [
    "Amazon.com", "Amazon.ca", "Amazon.com.mx", "Amazon.com.br",
    "Amazon.co.uk", "Amazon.de", "Amazon.fr", "Amazon.it",
    "Amazon.es", "Amazon.nl", "Amazon.com.au", "Amazon.co.jp",
    "Amazon.in", "Amazon.cn", "Amazon.sg", "Amazon.ae"
  ];

  return (
    <footer className={classes.footer}>
      {/* Back to Top */}
      <div 
        className={classes.back_to_top}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </div>

      {/* Main Footer Content */}
      <div className={classes.footer_content}>
        <div className={classes.footer_sections}>
          {footerSections.map((section, index) => (
            <div key={index} className={classes.footer_section}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Logo and Language/Country Selector */}
      <div className={classes.footer_middle}>
        <div className={classes.footer_logo}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          </Link>
        </div>
        
        <div className={classes.selectors}>
          <div className={classes.language_selector}>
            <select>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className={classes.currency_selector}>
            <select>
              <option value="usd">$ USD - U.S. Dollar</option>
              <option value="eur">€ EUR - Euro</option>
              <option value="gbp">£ GBP - British Pound</option>
              <option value="cad">$ CAD - Canadian Dollar</option>
            </select>
          </div>
          
          <div className={classes.country_selector}>
            <select>
              <option value="us">🇺🇸 United States</option>
              <option value="ca">🇨🇦 Canada</option>
              <option value="uk">🇬🇧 United Kingdom</option>
              <option value="de">🇩🇪 Germany</option>
              <option value="fr">🇫🇷 France</option>
              <option value="it">🇮🇹 Italy</option>
              <option value="es">🇪🇸 Spain</option>
              <option value="jp">🇯🇵 Japan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Amazon Sites */}
      <div className={classes.amazon_sites}>
        <div className={classes.sites_grid}>
          {countries.map((site, index) => (
            <a key={index} href="#" className={classes.site_link}>
              {site}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={classes.footer_bottom}>
        <div className={classes.footer_links}>
          <Link to="/conditions">Conditions of Use</Link>
          <Link to="/privacy">Privacy Notice</Link>
          <Link to="/interest-ads">Interest-Based Ads</Link>
        </div>
        <div className={classes.copyright}>
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </div>
      </div>

      {/* Social Media */}
      <div className={classes.social_media}>
        <h4>Connect with us</h4>
        <div className={classes.social_links}>
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="YouTube">📺</a>
          <a href="#" aria-label="LinkedIn">💼</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;