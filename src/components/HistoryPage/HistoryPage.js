import React, { useState, useEffect } from "react";
import Section from "../Section/Section";
import Line from "./Line/Line";
import MonthCtrl from "../MonthCtrl/MonthCtrl";
import Vendors from "./Vendors/Vendors";
import "./css/history-page.css";
import { connect } from "react-redux";
import { setMobileView as setMobileViewGlobal } from "../../store/state/mobileView";

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
    <div className="history-page">
      <div className="history-page__left">
        <Section outline="shadow" radius={20} type={"main"} height={mainHeight}>
          <Line />
        </Section>
        <Section outline="shadow" radius={20} type={"second"}>
          <MonthCtrl />
        </Section>
      </div>
      <div className="history-page__right">
        <Section outline="shadow" radius={20} type={"third"}>
          <Vendors simplebarHeight={simplebarHeight} />
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
