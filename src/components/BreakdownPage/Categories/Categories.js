import React, { useEffect, useState } from "react";
import "./css/categories.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Category from "./Category";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered/index";

const Categories = ({
  globalHovered,
  setGlobalHovered,
  categories,
  simplebarHeight
}) => {
  const [localHovered, setLocalHovered] = useState(null);
  const [sectionHover, setSectionHover] = useState(false);
  const [outsideView, setOutsideView] = useState(false);
  const [scrollView, setScrollView] = useState(0);

  const scrollableNodeRef = React.createRef();

  useEffect(() => {
    const scrollHeight =
      document.querySelector(".simplebar-content-wrapper").scrollHeight -
      document.querySelector(".simplebar-content-wrapper").clientHeight;

    const timeoutId = setTimeout(() => {
      const scrollAmount =
        (scrollHeight / (categories.length - 1)) * globalHovered;

      if (
        !sectionHover &&
        globalHovered !== null &&
        scrollView !== scrollAmount
      ) {
        setScrollView(scrollAmount);
      }

      if (
        !sectionHover &&
        globalHovered !== null &&
        scrollableNodeRef.current &&
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
        style={{ height: `${simplebarHeight}px`, autoHide: false }}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        {categories.map((cat, index) => (
          <Category
            index={index}
            setOutsideView={setOutsideView}
            outsideView={outsideView}
            setLocalHovered={setLocalHovered}
            hovered={globalHovered === index ? true : false}
            name={cat.name}
            data={cat.data}
            key={cat.name}
          />
        ))}
      </SimpleBar>
    </div>
  );
};

const mapStateToProps = state => ({
  globalHovered: state.hovered.index,
  categories: state.mockData.categories
});

const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
