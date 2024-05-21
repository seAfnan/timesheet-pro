import React, { useContext } from "react";
import { ThemeContext } from "./DarkModeContext";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";

const DarkModeTrigger = () => {
  const context = useContext(ThemeContext);
  // Use optional chaining to handle potential undefined context
  const { switchDark, switchLight, theme } = context ?? {};

  return (
    <button
      style={{ marginRight: "2rem", fontSize: "1.5rem" }}
      onClick={theme === "dark" ? switchLight : switchDark}
    >
      {theme === "dark" ? <MdBrightness7 /> : <MdBrightness4 />}
    </button>
  );
};

export default DarkModeTrigger;
