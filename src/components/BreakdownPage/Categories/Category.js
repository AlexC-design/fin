import React from "react";
import "./css/categories.css";

const Category = ({ name, data, total, hovered }) => {
  return (
    <div className={`category category${hovered ? "--hovered" : ""}`}>
      <div className="category__icon"></div>
      <div className="category__name">{name}</div>
      <div className="category__percentage">
        {Math.floor((data / total) * 100)}%
      </div>
    </div>
  );
};

export default Category;
