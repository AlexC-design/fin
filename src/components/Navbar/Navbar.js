import React, { useState } from "react";
import NavbarLink from "./NavbarLink";
import breakdown from "../../assets/icons/navbar/breakdown.svg";
import history from "../../assets/icons/navbar/history.svg";
import cards from "../../assets/icons/navbar/cards.svg";
import payments from "../../assets/icons/navbar/payments.svg";

import "./css/navbar.css";
import ThemeChangeButton from "./ThemeChangeButton";

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

const Navbar = ({ position }) => {
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

  return (
    <div className={`navbar navbar--${position}`}>
      {navbarLinks.map(link => (
        <NavbarLink
          active={active === link.name ? true : false}
          action={setActiveLink}
          icon={link.icon}
          position={position}
          linkName={link.name}
          key={link.name}
        />
      ))}
      <div
        className={`link-bg link-bg${animate}`}
        style={{ top: `${91 + 70 * activeLinkIndex(active)}px` }}
      />
      <ThemeChangeButton position={position} />
    </div>
  );
};

export default Navbar;
