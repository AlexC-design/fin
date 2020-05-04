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
  const [outsideView, setOutsideView] = useState(false);
  const [scrollView, setScrollView] = useState(0);

  const scrollableNodeRef = React.createRef();

  const total = mockCategories.reduce((acc, cur) => {
    return acc + cur.data;
  }, 0);

  useEffect(() => {
    const scrollHeight =
      document.querySelector(".simplebar-content-wrapper").scrollHeight -
      document.querySelector(".simplebar-content-wrapper").clientHeight;

    const timeoutId = setTimeout(() => {
      const scrollAmount =
        // document.querySelector(".simplebar-content-wrapper")
        //   .scrollTop;
        (scrollHeight / (mockCategories.length - 1)) * globalHovered;

      if (
        !sectionHover &&
        globalHovered !== null &&
        scrollView !== scrollAmount
      ) {
        setScrollView(scrollAmount);
      }

      if (
        globalHovered !== null &&
        scrollableNodeRef.current &&
        !sectionHover &&
        outsideView
      ) {
        scrollableNodeRef.current.scrollTo({
          top: scrollView,
          behavior: "smooth"
        });
      }
    }, 100);

    if (sectionHover && localHovered !== globalHovered) {
      setGlobalHovered(localHovered);
    }

    return () => clearTimeout(timeoutId);
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
            setOutsideView={setOutsideView}
            outsideView={outsideView}
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
