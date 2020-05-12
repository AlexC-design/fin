import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BreakdownPage from "./components/BreakdownPage/BreakdownPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import RedirectPage from "./utils/RedirectPage/RedirectPage";
import { setCategories } from "./store/state/mockData/index";
import MockDays from "./utils/mockData/MockDays";
import mockCategories from "./utils/mockData/mockCategories";

import "./css/app.css";

const App = ({ setCategories, currentMoment }) => {
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

    const total = parseFloat(
      categories
        .reduce((acc, cur) => {
          return acc + cur.data;
        }, 0)
        .toFixed(2)
    );

    return { categories, total };
  };

  useEffect(() => {
    setCategories(mockData().categories, mockData().total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    dispatch(setCategories(categories, total))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
