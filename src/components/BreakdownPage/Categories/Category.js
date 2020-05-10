import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isOutsideOfView } from "../../../utils/isOutsideOfView";
import "./css/categories.css";

const Category = ({
  name,
  data,
  total,
  hovered,
  setLocalHovered,
  setOutsideView,
  index,
  outsideView,
  icon
}) => {
  const hoverToggle = on => {
    on ? setLocalHovered(index) : setLocalHovered(null);
  };

  const catRef = React.createRef();

  useEffect(() => {
    const outside = isOutsideOfView(
      document.querySelector(".simplebar-content-wrapper").scrollTop,
      document.querySelector(".simplebar-content-wrapper").scrollTop +
        document.querySelector(".simplebar-content-wrapper").clientHeight,
      catRef.current.offsetTop,
      catRef.current.offsetTop + catRef.current.offsetHeight
    );

    if (hovered && outsideView !== outside) {
      setOutsideView(outside);
    }
  });

  return (
    <div
      ref={catRef}
      onMouseEnter={() => hoverToggle(true)}
      onMouseLeave={() => hoverToggle(false)}
      className={`category category${hovered ? "--hovered" : ""}`}
    >
      <img src={icon} className="category__icon" />
      <div className="category__name">{name}</div>
      <div className="category__percentage">
        {Math.floor((data / total) * 100)}%
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  total: state.mockData.total
});

export default connect(mapStateToProps)(Category);
