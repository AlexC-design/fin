import React from "react";
import Section from "../Section/Section";
import Doughnut from "./Doughnut/Doughnut";
import MonthCtrl from "../MonthCtrl/MonthCtrl";
import Categories from "./Categories/Categories";
import "./css/breakdown-page.css";

const BreakdownPage = () => {
  return (
    <div className="breakdown-page">
      <div className="breakdown-page__left">
        <Section outline="shadow" radius={20} type={"main"}>
          <Doughnut />
        </Section>
        <Section outline="shadow" radius={20} type={"second"}>
          <MonthCtrl />
        </Section>
      </div>
      <div className="breakdown-page__right">
        <Section outline="shadow" radius={20} type={"third"}>
          <Categories />
        </Section>
      </div>
    </div>
  );
};

export default BreakdownPage;
