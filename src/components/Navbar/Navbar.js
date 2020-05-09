import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NavbarLink from "./NavbarLink";
import breakdown from "../../assets/icons/navbar/breakdown.svg";
import history from "../../assets/icons/navbar/history.svg";
import cards from "../../assets/icons/navbar/cards.svg";
import payments from "../../assets/icons/navbar/payments.svg";
import ThemeChangeButton from "./ThemeChangeButton";

import "./css/navbar.css";

const navbarLinks = [
  {
    path: "breakdown",
    name: "Breakdown",
    icon: breakdown
  },
  {
    path: "history",
    name: "History",
    icon: history
  },
  {
    path: "cards",
    name: "Cards",
    icon: cards
  },
  {
    path: "payments",
    name: "Payments",
    icon: payments
  }
];

const Navbar = ({ history, theme, changeTheme, mobileView }) => {
  const [active, setActive] = useState(
    history.location.pathname.replace("/", "")
  );
  const [animate, setAnimate] = useState("");

  const setActiveLink = path => {
    setActive(path);
    setAnimate("--animate");
    const timeoutId = setTimeout(() => {
      setAnimate("");
    }, 400);

    history.push(path);

    return () => clearTimeout(timeoutId);
  };

  const activeLinkIndex = path => {
    return navbarLinks.findIndex(link => link.path === path);
  };

  useEffect(() => {
    setActive(history.location.pathname.replace("/", ""));
  }, [history.location.pathname]);

  const Vstyle = { top: `${91 + 70 * activeLinkIndex(active)}px` };
  const Hstyle = { left: `calc((80px + 30%)/1.5 + ${0}vw)` };

  return (
    <div className={`navbar`}>
      {navbarLinks.map(link => (
        <NavbarLink
          active={active === link.path ? true : false}
          action={setActiveLink}
          icon={link.icon}
          name={link.name}
          path={link.path}
          key={link.name}
        />
      ))}
      <div
        className={`link-bg link-bg${animate}`}
        style={mobileView ? Hstyle : Vstyle}
      />
      <ThemeChangeButton theme={theme} changeTheme={changeTheme} />
    </div>
  );
};

const mapStateToProps = state => ({
  mobileView: state.mobileView
});

const wrappedComponent = withRouter(Navbar);

export default connect(mapStateToProps)(wrappedComponent);
