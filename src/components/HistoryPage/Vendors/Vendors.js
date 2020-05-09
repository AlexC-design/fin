import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered/index";
import "./css/vendors.css";
import Day from "./Day";

const Vendors = ({
  globalHovered,
  setGlobalHovered,
  vendors,
  simplebarHeight,
  days
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
        (scrollHeight / (days.length - 1)) * globalHovered;

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
      className="vendors-container"
    >
      <SimpleBar
        style={{ height: `${simplebarHeight}px`, autoHide: false }}
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        {days.map((day, index) => {
          return (
            <Day
              index={index}
              setOutsideView={setOutsideView}
              outsideView={outsideView}
              setLocalHovered={setLocalHovered}
              hovered={globalHovered === index ? true : false}
              day={day.day}
              amount={day.amount}
              vendorsNo={Math.floor(Math.random() * 7) + 1}
              key={day.day}
            />
          );
        })}
      </SimpleBar>
    </div>
  );
};

const mapStateToProps = state => ({
  globalHovered: state.hovered.index,
  vendors: state.mockData.vendors,
  days: state.mockData.days
});

const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
