import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import BreakdownPage from "./components/BreakdownPage/BreakdownPage";
import { setCategories } from "./store/state/mockData/index";
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

    const total = categories.reduce((acc, cur) => {
      return acc + cur.data;
    }, 0);

    return { categories, total };
  };

  useEffect(() => {
    setCategories(mockData().categories, mockData().total);
  }, [currentMoment]);

  return (
    <>
      <Navbar position={"side"} changeTheme={changeTheme} theme={theme} />
      <div className="main-screen">
        <div className="page-spacer" />
        <div className="page-container">
          <BreakdownPage />
        </div>
      </div>
    </>
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
