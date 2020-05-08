import React from "react";

import "./css/section.css";

const Section = ({ outline, children, radius, type, height }) => {
  const mainRef = React.createRef();

  const mainStyle = {
    borderRadius: `${radius}px`,
    minHeight: `${height}px`,
    maxHeight: `${height}px`
  };
  const style = { borderRadius: `${radius}px` };

  return (
    <div
      className={`section section--${outline} section--${type}`}
      style={type === "main" ? mainStyle : style}
      ref={type === "main" ? mainRef : null}
    >
      {children}
    </div>
  );
};

export default Section;
