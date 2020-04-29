import React, { useEffect } from "react";

import "./css/section.css";

const Section = ({ outline, children, radius, type }) => {
  const mainRef = React.createRef();

  useEffect(() => {
    console.log(
      document.querySelector(".section--main")
        ? document.querySelector(".section--main").offsetHeight
        : "none"
    );
    if (mainRef.current) {
      console.log(mainRef.current.classList.value.includes('main'));
    }
  }, []);

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
