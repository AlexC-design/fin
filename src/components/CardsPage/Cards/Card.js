import React from "react";
import "./css/cards.css";

const Card = ({ type, image, setOrder, order, position, selected }) => {
  const cardPosition = {
    first: {
      left: "0%",
      top: "50%",
      transform: "translate(0%, -50%) scale(0.8)",
      opacity: "0.5",

      zIndex: "2"
    },
    second: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",

      zIndex: "3"
    },
    third: {
      left: "100%",
      top: "50%",
      transform: "translate(-100%, -50%) scale(0.8)",
      opacity: "0.5",

      zIndex: "2"
    }
  };

  const handleClick = () => {
    const newOrder = order;

    newOrder[position] = newOrder[1];
    newOrder[1] = type;

    setOrder({ order: newOrder });
  };

  return (
    <div
      className={`card card${selected ? "--selected" : ""}`}
      onClick={handleClick}
      style={
        position === 0
          ? cardPosition.first
          : position === 1
          ? cardPosition.second
          : cardPosition.third
      }
    >
      <img className="card__image" src={image} alt="" />
    </div>
  );
};

export default Card;
