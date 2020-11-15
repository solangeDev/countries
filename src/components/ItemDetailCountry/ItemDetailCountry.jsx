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
  const [borders, setBorders] = useState([]);
  const [isBordersReady, setIsBordersReady] = useState(false);

  const parseLenguages = (e) => {
    if (e !== undefined) {
      let arr = e.map((a) => {
        return a.name;
      });
      return arr.join(", ");
    }
  };

  const parseCurrencies = (e) => {
    if (e !== undefined) {
      let arr = e.map((a) => {
        return a.name;
      });
      return arr.join(", ");
    }
  };

  const getData = async (param) => {
    try {
      return await axios.get(`https://restcountries.eu/rest/v2/name/${param}`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getDataByIso = async (param) => {
    try {
      return await axios.get(`https://restcountries.eu/rest/v2/alpha/${param}`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getCountryDetail = async () => {
    try {
      const response = await getData(selectedCountry);
      if (response !== false) {
        setData(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryDetail();
    setBorders([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      try {
        let arr = [];
        data.borders.forEach(async (a) => {
          let resp = await getDataByIso(a);
          setBorders((borders) => [...borders, resp.data]);
        });
        setIsBordersReady(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  return (
    <section className="ItemDetailCountry">
      <Link to={"/"}>
        <div className="ItemDetailCountry__wrapperButton">
          <div
            className={`ItemDetailCountry__btnBack ${
              props.theme ? "ItemDetailCountry__btn-dark-back" : ""
            }`}
          >
            <div>
              <i className="fas fa-long-arrow-alt-left"></i>
            </div>
            <div>Back</div>
          </div>
        </div>
      </Link>
      <div className="ItemDetailCountry__wrapper">
        <div className="ItemDetailCountry__image">
          <img src={data.flag}></img>
        </div>
        <div className="ItemDetailCountry__description">
          <div
            className={`ItemDetailCountry__title ${
              props.theme ? "ItemDetailCountry__color-dark-title" : ""
            }`}
          >
            {data.name}
          </div>
          <div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Native Name:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {data.name}
                </div>
              </div>
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Top Level Domain:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {data.topLevelDomain !== undefined
                    ? data.topLevelDomain[0]
                    : ""}
                </div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Population:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {new Intl.NumberFormat("de-DE").format(data.population)}
                </div>
              </div>
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Currencies:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {parseCurrencies(data.currencies)}
                </div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Region:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {data.region}
                </div>
              </div>
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Lenguages:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {parseLenguages(data.languages)}
                </div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Sub Region:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {data.subregion}
                </div>
              </div>
            </div>
            <div className="ItemDetailCountry__items">
              <div className="ItemDetailCountry__item">
                <div
                  className={`ItemDetailCountry__cell ${
                    props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                  }`}
                >
                  Capital:
                </div>
                <div
                  className={
                    props.theme ? "ItemDetailCountry__color-dark-fonts" : ""
                  }
                >
                  {data.capital}
                </div>
              </div>
            </div>
            <div className={"ItemDetailCountry__border-countries"}>
              <div
                className={`ItemDetailCountry__cell ${
                  props.theme ? "ItemDetailCountry__color-dark-cell" : ""
                }`}
              >
                Border Countries:
              </div>
              {isBordersReady &&
                borders.map((a, index) => (
                  <Link key={index} to={`/detail/${a.name}`}>
                    <div
                      className={`ItemDetailCountry__country-item ${
                        props.theme ? "ItemDetailCountry__item-dark" : ""
                      }`}
                    >
                      {a.name}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
