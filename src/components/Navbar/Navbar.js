import React, { useState } from "react";
import NavbarLink from "./NavbarLink";
import breakdown from "../../assets/icons/navbar/breakdown.svg";
import history from "../../assets/icons/navbar/history.svg";
import cards from "../../assets/icons/navbar/cards.svg";
import payments from "../../assets/icons/navbar/payments.svg";

import "./css/navbar.css";
import ThemeChangeButton from "./ThemeChangeButton";
import { connect } from "react-redux";

const navbarLinks = [
  {
    name: "Breakdown",
    icon: breakdown
  },
  {
    name: "History",
    icon: history
  },
  {
    name: "Cards",
    icon: cards
  },
  {
    name: "Payments",
    icon: payments
  }
];

const Navbar = ({ size, theme, changeTheme, mobileView }) => {
  const [active, setActive] = useState(navbarLinks[0].name);
  const [animate, setAnimate] = useState("");

  const setActiveLink = linkName => {
    setActive(linkName);
    setAnimate("--animate");
    const timeoutId = setTimeout(() => {
      setAnimate("");
    }, 400);

    return () => clearTimeout(timeoutId);
  };

  const activeLinkIndex = linkName => {
    return navbarLinks.findIndex(link => link.name === linkName);
  };

  const Vstyle = { top: `${91 + 70 * activeLinkIndex(active)}px` };
  const Hstyle = { left: `calc((80px + 30%)/1.5 + ${0}vw)` };

  return (
    <div className={`navbar navbar--${size}`}>
      {navbarLinks.map(link => (
        <NavbarLink
          active={active === link.name ? true : false}
          action={setActiveLink}
          icon={link.icon}
          size={size}
          linkName={link.name}
          key={link.name}
        />
      ))}
      <div
        className={`link-bg link-bg${animate}`}
        style={mobileView ? Hstyle : Vstyle}
      />
      <ThemeChangeButton size={size} theme={theme} changeTheme={changeTheme} />
    </div>
  );
};

const mapStateToProps = state => ({
  mobileView: state.mobileView
});

export default connect(mapStateToProps)(Navbar);
