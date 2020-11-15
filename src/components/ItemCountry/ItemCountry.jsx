import React, { useState, useEffect } from "react";
import "./ItemCountry.scss";
import { Link } from "react-router-dom";

function ItemCountry(props) {
  return (
    <article className="ItemCountry">
      <div className="ItemCountry__image">
        <Link to={`/detail/${props.data.name}`}>
          <img src={props.data.flag}></img>
        </Link>
      </div>
      <div
        className={`ItemCountry__wrapper ${
          props.theme ? "ItemCountry__color-dark-wrapper" : ""
        }`}
      >
        <div
          className={`ItemCountry__title ${
            props.theme ? "ItemCountry__color-light" : ""
          }`}
        >
          {props.data.name}
        </div>
        <div className="ItemCountry__item-description">
          <div className={props.theme ? "ItemCountry__color-light" : ""}>
            Population:
          </div>
          <div>
            {new Intl.NumberFormat("de-DE").format(props.data.population)}
          </div>
        </div>
        <div className="ItemCountry__item-description">
          <div className={props.theme ? "ItemCountry__color-light" : ""}>
            Region:
          </div>
          <div>{props.data.region}</div>
        </div>
        <div className="ItemCountry__item-description">
          <div className={props.theme ? "ItemCountry__color-light" : ""}>
            Capital:
          </div>
          <div>{props.data.capital}</div>
        </div>
      </div>
    </article>
  );
}

export default ItemCountry;
