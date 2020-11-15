import React, { useState, useEffect } from "react";
import "./Header.scss";

function Header(props) {
  const handleChange = () => {
    props.getTheme(!props.theme);
  };
  return (
    <header className="Header">
      <section
        className={`Header__container ${
          !props.theme ? "Header__light" : "Header__dark"
        }`}
      >
        <div
          className={`Header__title  ${
            props.theme ? "Header__color-light" : "Header__color-dark"
          }`}
        >
          Where in the word?
        </div>
        <div className="Header__btn-theme" onClick={handleChange}>
          <div
            className={`fas fa-moon ${
              props.theme ? "Header__color-light" : "Header__color-dark"
            }`}
          ></div>
          <div
            className={
              props.theme ? "Header__color-light" : "Header__color-dark"
            }
          >
            {props.theme ? "Dark Mode" : "White Mode"}
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
