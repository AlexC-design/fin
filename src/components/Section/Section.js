import React from "react";

import "./css/section.css";

const Section = ({ outline, children, radius, type }) => {
  const mainRef = React.createRef();

  return (
    <div
      className={`section section--${outline} section--${type}`}
      style={{ borderRadius: `${radius}px` }}
      ref={type === "main" ? mainRef : null}
    >
      {children}
    </div>
  );
};

export default Section;
