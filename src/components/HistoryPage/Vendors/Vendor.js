import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./css/vendors.css";

const Vendor = ({
  name,
  data,
  total,
  hovered,
  setLocalHovered,
  setOutsideView,
  index,
  outsideView
}) => {
  const hoverToggle = on => {
    on ? setLocalHovered(index) : setLocalHovered(null);
  };

  const isOutsideOfView = (viewTop, viewBot, elTop, elBot) => {
    if (elTop < viewTop || elBot > viewBot) {
      return true;
    } else {
      return false;
    }
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
      className={`vendor vendor${hovered ? "--hovered" : ""}`}
    >
      <div className="vendor__icon"></div>
      <div className="vendor__name">{name}</div>
      <div className="vendor__percentage">
        {Math.floor((data / total) * 100)}%
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  total: state.mockData.total
});

export default connect(mapStateToProps)(Vendor);
