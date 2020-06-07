import React, { useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Navbar from "./components/Navbar/Navbar";
import BreakdownPage from "./components/BreakdownPage/BreakdownPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
import CardsPage from "./components/CardsPage/CardsPage";
import PaymentsPage from "./components/PaymentsPage/PaymentsPage";
import RedirectPage from "./utils/RedirectPage/RedirectPage";
import MockDays from "./utils/mockData/MockDays";
import mockCategories from "./utils/mockData/mockCategories";
import { setTheme } from "./store/state/theme";
import { setCategories } from "./store/state/mockData/index";
import "./css/app.css";

const App = ({ setCategories, currentMoment, setTheme, theme }) => {
  const changeTheme = (oldTheme, newTheme) => {
    document.querySelector("body").classList.remove(`theme-${oldTheme}`);
    document.querySelector("body").classList.add(`theme-${newTheme}`);

    document.querySelector("html").classList.remove(`theme-${oldTheme}`);
    document.querySelector("html").classList.add(`theme-${newTheme}`);

    if (oldTheme !== newTheme) {
      setTheme(newTheme);
    }
  };

  const mockData = () => {
    let categories = mockCategories();
    if (moment(currentMoment).format("MM YY") === moment().format("MM YY")) {
      categories = categories.map(cat => {
        return {
          ...cat,
          data: parseFloat((cat.data * (moment().date() / 32)).toFixed(2))
        };
      });
    }

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
    changeTheme(theme === "light" ? "dark" : "light", theme);
  }, []);

  useEffect(() => {
    setCategories(mockData().categories, mockData().total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMoment]);

  useEffect(() => {
    console.log('updating')
  })

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
          <Route path="/cards" exact component={CardsPage} />
          <Route path="/payments" exact component={PaymentsPage} />
        </div>
      </div>
    </HashRouter>
  );
};

const mapStateToProps = state => ({
  currentMoment: state.currentMoment.moment,
  theme: state.theme
});

const mapDispatchToProps = dispatch => ({
  setCategories: (categories, total) =>
    dispatch(setCategories(categories, total)),
  setTheme: theme => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
