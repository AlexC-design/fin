import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BreakdownPage from "./components/BreakdownPage/BreakdownPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import RedirectPage from "./utils/RedirectPage/RedirectPage";
import { setCategories, setVendors } from "./store/state/mockData/index";
import MockDays from "./utils/mockData/MockDays";
import mockCategories from "./utils/mockData/mockCategories";
import mockVendors from "./utils/mockData/mockVendors";

import "./css/app.css";

const App = ({ setCategories, currentMoment, setVendors }) => {
  const [theme, setTheme] = useState("light");

  const changeTheme = newTheme => {
    document.querySelector("body").classList.remove(`theme-${theme}`);
    document.querySelector("body").classList.add(`theme-${newTheme}`);

    document.querySelector("html").classList.remove(`theme-${theme}`);
    document.querySelector("html").classList.add(`theme-${newTheme}`);

    if (theme !== newTheme) {
      setTheme(newTheme);
    }
  };

  const mockData = () => {
    const categories = mockCategories();
    const vendors = mockVendors();

    const total = parseFloat(
      categories
        .reduce((acc, cur) => {
          return acc + cur.data;
        }, 0)
        .toFixed(2)
    );

    return { categories, total, vendors };
  };

  useEffect(() => {
    setCategories(mockData().categories, mockData().total);
    setVendors(mockData().vendors);
  }, [currentMoment]);

  return (
    <HashRouter basename="/">
      <MockDays />
      <Navbar changeTheme={changeTheme} theme={theme} />
      <div className="main-screen">
        <div className="page-spacer" />
        <div className="page-container">
          <Route path="/" exact component={RedirectPage} />
          <Route path="/breakdown" exact component={BreakdownPage} />
          <Route path="/history" exact component={HistoryPage} />
        </div>
      </div>
    </HashRouter>
  );
};

const mapStateToProps = state => ({
  currentMoment: state.currentMoment.moment
});

const mapDispatchToProps = dispatch => ({
  setCategories: (categories, total) =>
    dispatch(setCategories(categories, total)),
  setVendors: vendors => dispatch(setVendors(vendors))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
