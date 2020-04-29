import React, { useRef, useEffect } from "react";
import "./css/categories.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import mockCategories from "../../../utils/mockData/mockCategories";
import Category from "./Category";

const Categories = () => {
  const total = mockCategories.reduce((acc, cur) => {
    return acc + cur.data;
  }, 0);

  return (
    <div className="categories-container">
      <SimpleBar autoHide={false}>
        {mockCategories.map(cat => (
          <Category name={cat.name} data={cat.data} total={total} />
        ))}
      </SimpleBar>
    </div>
  );
};

export default Categories;
