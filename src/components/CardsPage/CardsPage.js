import React from "react";
import "./css/cards-page.css";
import Cards from "./Cards/Cards";
import CardOptions from "./CardOptions/CardOptions";

const CardsPage = () => {
  return (
    <div className="cards-page">
      <Cards />
      <CardOptions />
    </div>
  );
};

export default CardsPage;
