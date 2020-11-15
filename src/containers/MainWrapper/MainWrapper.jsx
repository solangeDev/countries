import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import ItemCountry from "../../components/ItemCountry";
import ItemDetailCountry from "../../components/ItemDetailCountry";
import Searcher from "../../components/Autocomplete";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import "./MainWrapper.scss";

function MainWrapper(props) {
  const max = 8;
  const [page, setPage] = useState(1);
  const end = max * page;
  const start = end - max;
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getTheme = (e) => {
    setTheme(e);
  };
  const [searcher, setSearcher] = useState({
    placeholder: "Search for a country",
    searchIcon: true,
    name: "searcher",
    value: "",
    options: [],
    className: "AutocompleteSearcher",
  });

  const [region, setRegion] = useState({
    className: "AutocompleteRegion",
    placeholder: "Filter by Region",
    searchIcon: false,
    name: "region",
    value: "",
    options: [
      { name: "Africa", value: "Africa" },
      { name: "America", value: "America" },
      { name: "Asia", value: "Asia" },
      { name: "Europa", value: "Europa" },
      { name: "Oseania", value: "Oseania" },
    ],
  });

  const handleChangeSearcher = (e) => {
    setSearcher({ ...searcher, value: e });
    if (e.length === 0) {
      setData(countries.slice(start, max * 1));
      setHasMore(true);
    } else {
      const data = countries.filter((a) => {
        if (a.name === e) {
          return a;
        }
      });
      setData(data);
      setHasMore(false);
    }
  };

  const handleChangeRegion = (e) => {
    setRegion({ ...region, value: e });
    if (e.length === 0) {
      setData(countries.slice(start, max * 1));
      setHasMore(true);
    } else {
      const data = countries.filter((a) => {
        if (a.region === e) {
          return a;
        }
      });
      setData(data);
      setHasMore(false);
    }
  };

  const listCountries = async (e) => {
    try {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(function (response) {
          setSearcher({ ...searcher, options: response.data });
          setCountries(response.data);
          //setData(response.data.slice(start, end));
          setData(response.data);
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
    listCountries();
  }, []);

  const nextPage = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    //console.log(page, "effect");
    setData([...data, ...countries.slice(start, end)]);
  }, [page]);

  return (
    <section className="MainWrapper">
      <Header theme={theme} getTheme={getTheme}></Header>
      <article
        className={`MainWrapper__container ${
          !theme ? "MainWrapper__theme-light" : "MainWrapper__theme-dark"
        }`}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="MainWrapper__search-bar">
                <div className="MainWrapper__w-searcher">
                  <Searcher
                    handleChange={handleChangeSearcher}
                    theme={theme}
                    data={searcher}
                  ></Searcher>
                </div>
                <div className={"MainWrapper__paddingTop"}>
                  <Searcher
                    handleChange={handleChangeRegion}
                    theme={theme}
                    data={region}
                  ></Searcher>
                </div>
              </div>
              {/* <InfiniteScroll
                dataLength={countries.length}
                next={nextPage}
                hasMore={hasMore}
                loader={
                  <h4 className={theme ? "MainWrapper__light-theme" : ""}>
                    Loading...
                  </h4>
                } */}
              >
              <div className="MainWrapper__wrapper">
                {data.map((row, index) => (
                  <ItemCountry
                    key={index}
                    data={row}
                    theme={theme}
                  ></ItemCountry>
                ))}
              </div>
              {/* </InfiniteScroll> */}
            </Route>
            <Route
              path="/detail/:selectedCountry"
              children={<ItemDetailCountry theme={theme} />}
            ></Route>
          </Switch>
        </Router>
      </article>
    </section>
  );
}
export default MainWrapper;
