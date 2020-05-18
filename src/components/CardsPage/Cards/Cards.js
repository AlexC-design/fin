import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import card1 from "../../../assets/cards/card1.svg";
import card2 from "../../../assets/cards/card2.svg";
import card3 from "../../../assets/cards/card3.svg";
import arrowLeft from "../../../assets/icons/misc/arrow-circle-left.svg";
import arrowRight from "../../../assets/icons/misc/arrow-circle-right.svg";
import "./css/cards.css";

const cards = [
  {
    type: "black",
    image: card1
  },
  {
    type: "blue",
    image: card2
  },
  {
    type: "red",
    image: card3
  }
];
const Cards = ({ popupType }) => {
  const [order, setOrder] = useState({ order: ["black", "blue", "red"] });

  const nextCard = () => {
    const newOrder = order.order;

    newOrder.push(newOrder[0]);
    newOrder.splice(0, 1);

    setOrder({ order: newOrder });
  };

  const prevCard = () => {
    const newOrder = order.order;

    newOrder.unshift(newOrder[2]);
    newOrder.splice(3, 1);

    setOrder({ order: newOrder });
  };

  return (
    <div className={`cards cards${popupType !== null ? "--popup-opened" : ""}`}>
      <div className="cards__arrows">
        <img
          className="cards__arrows__arrow cards__arrows__left"
          src={arrowLeft}
          onClick={prevCard}
          alt=""
        />
        <img
          className="cards__arrows__arrow cards__arrows__right"
          onClick={nextCard}
          src={arrowRight}
          alt=""
        />
      </div>

      {cards.map((card, index) => {
        return (
          <Card
            selected={index === 1 ? true : false}
            key={card.type}
            type={card.type}
            position={order.order.indexOf(card.type)}
            image={card.image}
            order={order.order}
            setOrder={setOrder}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  popupType: state.popup.type
});

export default connect(mapStateToProps)(Cards);
