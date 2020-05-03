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
  const [sectionHover, setSectionHover] = useState(false);

  const scrollableNodeRef = React.createRef();

  const total = mockCategories.reduce((acc, cur) => {
    return acc + cur.data;
  }, 0);

  useEffect(() => {
    const scrollHeight =
      document.querySelector(".simplebar-content-wrapper").scrollHeight -
      document.querySelector(".simplebar-content-wrapper").clientHeight;

    if (globalHovered !== null && scrollableNodeRef.current) {
      scrollableNodeRef.current.scrollTo({
        top: (scrollHeight / (mockCategories.length - 1)) * globalHovered,
        behavior: "smooth"
      });
    }

    if (sectionHover && localHovered !== globalHovered) {
      setGlobalHovered(localHovered);
    }
  });

  return (
    <div
      onMouseEnter={() => setSectionHover(true)}
      onMouseLeave={() => setSectionHover(false)}
      className="categories-container"
    >
      <SimpleBar
        autoHide={false}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        {mockCategories.map((cat, index) => (
          <Category
            index={index}
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
