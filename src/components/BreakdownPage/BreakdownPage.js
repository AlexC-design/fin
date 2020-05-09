import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Section from "../Section/Section";
import Doughnut from "./Doughnut/Doughnut";
import MonthCtrl from "../MonthCtrl/MonthCtrl";
import Categories from "./Categories/Categories";
import { setMobileView as setMobileViewGlobal } from "../../store/state/mobileView";
import "./css/breakdown-page.css";

const BreakdownPage = ({ setMobileViewGlobal, mobileViewGlobal }) => {
  const [mainHeight, setMainHeight] = useState(0);
  const [simplebarHeight, setSimplebarHeight] = useState(0);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMainHeight(
        document.querySelector(".section--main")
          ? document.querySelector(".section--main").clientWidth -
              parseInt(
                window
                  .getComputedStyle(
                    document.querySelector(".section--main"),
                    null
                  )
                  .getPropertyValue("padding")
                  .replace(/px|%|vh|vw|em|rem/g, "")
              ) *
                2
          : null
      );

      setSimplebarHeight(0);

      setSimplebarHeight(
        document.querySelector(".section--third")
          ? document.querySelector(".section--third").clientHeight -
              parseInt(
                window
                  .getComputedStyle(
                    document.querySelector(".section--third"),
                    null
                  )
                  .getPropertyValue("padding")
                  .replace(/px|%|vh|vw|em|rem/g, "")
              ) *
                2
          : null
      );
    };

    const timeoutId = setTimeout(() => {
      handleResize();

      setSimplebarHeight(
        document.querySelector(".section--third")
          ? document.querySelector(".section--third").clientHeight -
              parseInt(
                window
                  .getComputedStyle(
                    document.querySelector(".section--third"),
                    null
                  )
                  .getPropertyValue("padding")
                  .replace(/px|%|vh|vw|em|rem/g, "")
              ) *
                2
          : null
      );
    }, 10);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 640 && !mobileView) {
      setMobileView(true);
    } else if (window.innerWidth > 640 && mobileView === true) {
      setMobileView(false);
    }

    if (mobileView !== mobileViewGlobal) {
      setMobileViewGlobal(mobileView);
    }
  }, [mobileView, mobileViewGlobal, setMobileViewGlobal]);

  return (
    <div className="breakdown-page">
      <div className="breakdown-page__left">
        <Section outline="shadow" radius={20} type={"main"} height={mainHeight}>
          <Doughnut />
        </Section>
        <Section outline="shadow" radius={20} type={"second"}>
          <MonthCtrl />
        </Section>
      </div>
      <div className="breakdown-page__right">
        <Section outline="shadow" radius={20} type={"third"}>
          <Categories simplebarHeight={simplebarHeight} />
        </Section>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  mobileViewGlobal: state.mobileView
});

const mapDispatchToProps = dispatch => ({
  setMobileViewGlobal: mobileView => dispatch(setMobileViewGlobal(mobileView))
});

export default connect(mapStateToProps, mapDispatchToProps)(BreakdownPage);
