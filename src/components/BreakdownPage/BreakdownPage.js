import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Section from "../Section/Section";
import Doughnut from "./Doughnut/Doughnut";
import mockCategories from "../../utils/mockData/mockCategories";
import MonthCtrl from "../MonthCtrl/MonthCtrl";
import Categories from "./Categories/Categories";
import "./css/breakdown-page.css";

const BreakdownPage = ({ currentMoment }) => {
  const [categories, setCategories] = useState(mockCategories);

  useEffect(() => {
    console.log("Updating");
    setCategories(mockCategories);
  }, [currentMoment, categories, mockCategories]);

  return (
    <div className="breakdown-page">
      <div className="breakdown-page__left">
        <Section outline="shadow" radius={20} type={"main"}>
          <Doughnut categories={categories} />
        </Section>
        <Section outline="shadow" radius={20} type={"second"}>
          <MonthCtrl />
        </Section>
      </div>
      <div className="breakdown-page__right">
        <Section outline="shadow" radius={20} type={"third"}>
          <Categories categories={categories} />
        </Section>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentMoment: state.currentMoment.moment
});

export default connect(mapStateToProps)(BreakdownPage);
