import React from "react";

import "./css/section.css";

const Section = ({ outline, children, radius, type }) => {
  return (
    <div
      className={`section section--${outline} section--${type}`}
      style={{ borderRadius: `${radius}px` }}
    >
      {children}
    </div>
  );
};

export default Section;
