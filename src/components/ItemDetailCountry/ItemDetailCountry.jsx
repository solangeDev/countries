import React, { useState, useEffect } from "react";
import "./ItemDetailCountry.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";

export default function ItemDetailCountry(props) {
  let { selectedCountry } = useParams();
  const [data, setData] = useState({});

  const parseLenguages = (e) => {
    let arr = e.map((a) => {
      return a.name;
    });
    return arr.join(", ");
  };

  const parseCurrencies = (e) => {
    let arr = e.map((a) => {
      return a.name;
    });
    return arr.join(", ");
  };

  const getCountryDetail = () => {
    try {
      console.log(selectedCountry, "si");
      axios
        .get(`https://restcountries.eu/rest/v2/name/${selectedCountry}`)
        .then(function (response) {
          console.log(response.data[0], "aja");
          setData(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("lala");
    getCountryDetail();
  }, [selectedCountry]);

  return (
    <section className="ItemDetailCountry">
      <div className="ItemDetailCountry__wrapperButton">
        <div>Button</div>
      </div>
      <div className="ItemDetailCountry__wrapper">
        <div className="ItemDetailCountry__image">
          <img src={data.flag}></img>
        </div>
        <div className="ItemDetailCountry__description">
          <div className="ItemDetailCountry__title">{data.name}</div>
          <div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div>Native Name:</div>
                <div>{data.name}</div>
              </div>
              <div className="ItemDetailCountry__item">
                <div>Top Level Domain:</div>
                <div>{data.topLevelDomain[0]}</div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div>Population:</div>
                <div>
                  {new Intl.NumberFormat("de-DE").format(data.population)}
                </div>
              </div>
              <div className="ItemDetailCountry__item">
                <div>Currencies:</div>
                <div>{parseCurrencies(data.currencies)}</div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div>Region:</div>
                <div>{data.region}</div>
              </div>
              <div className="ItemDetailCountry__item">
                <div>Lenguages:</div>
                <div>{parseLenguages(data.languages)}</div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div>Sub Region:</div>
                <div>{data.subregion}</div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div>Capital:</div>
                <div>{data.capital}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
