import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";

import "./css/app.css";

const App = () => {
  const [theme, setTheme] = useState("light");

  const changeTheme = newTheme => {
    document.querySelector("body").classList.remove(`theme-${theme}`);
    document.querySelector("body").classList.add(`theme-${newTheme}`);

    document.querySelector("html").classList.remove(`theme-${theme}`);
    document.querySelector("html").classList.add(`theme-${newTheme}`);

    if (theme !== newTheme) {
      setTheme(newTheme);
    }
  };

  return (
    <div>
      <Navbar position={"side"} changeTheme={changeTheme} theme={theme} />
    </div>
  );
};

export default App;
