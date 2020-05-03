import React, { useEffect, useState } from "react";
import "./css/categories.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import mockCategories from "../../../utils/mockData/mockCategories";
import Category from "./Category";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered/index";

const Categories = ({ globalHovered, setGlobalHovered }) => {
  const [localHovered, setLocalHovered] = useState(null);

  const total = mockCategories.reduce((acc, cur) => {
    return acc + cur.data;
  }, 0);

  useEffect(() => {
    //TODO
  });

  return (
    <div className="categories-container">
      <SimpleBar autoHide={false}>
        {mockCategories.map((cat, index) => (
          <Category
            setLocalHovered={setLocalHovered}
            hovered={globalHovered === index ? true : false}
            name={cat.name}
            data={cat.data}
            total={total}
            key={cat.name}
          />
        ))}
      </SimpleBar>
    </div>
  );
};

const mapStateToProps = state => ({
  globalHovered: state.hovered.index
});

const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
