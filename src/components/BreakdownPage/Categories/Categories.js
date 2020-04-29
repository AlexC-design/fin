import React from "react";
import "./css/categories.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import mockCategories from "../../../utils/mockData/mockCategories";

const Categories = () => {
  return (
    <div>
      {/* <SimpleBar forceVisible="y" autoHide={false}>
        {mockCategories.map(cat => (
          <div style={{height: '500px'}}>{cat.name}</div>
        ))}
      </SimpleBar> */}
    </div>
  );
};

export default Categories;
