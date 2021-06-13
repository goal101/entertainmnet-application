import React, { useState, useEffect } from "react";
import "./Search.css";
import { fetchSearch } from "../../api/api";
import SingleContent from "../../components/SingleContent/SingleContent";
import useDidMountEffect from "../../hooks/hooks";
import { handleSetSpecifit } from "../../api/api";
import Modal from "../../components/Modal/Modal";
import SearchIcon from "@material-ui/icons/Search";

export default function Search() {
  const [content, setContent] = useState([]);
  const [moviesActive, setMoviesActive] = useState(true);
  const [search, setSearch] = useState("");
  const [specific, setSpecific] = useState();
  const [cast, setCast] = useState([]);

  const handleSubmit = (event) => {
    fetchData();
    event.preventDefault();
  };

  const handleSpecific = (id) => {
    let type = "movie";

    if (moviesActive === false) {
      type = "tv";
    }
    const data = handleSetSpecifit(content, id, type);

    data.then((value) => {
      setCast(value[1]);
      setSpecific(value[0]);
    });

    document.body.style.overflow = "hidden";
  };

  const handleModal = () => {
    setSpecific(null);
    document.body.style.overflow = "scroll";
  };

  document.addEventListener("click", function (event) {
    if (event.target.matches(".overlay")) {
      handleModal();
    }
  });

  const fetchData = () => {
    let type = "movie";

    if (moviesActive === false) {
      type = "tv";
    }
    const data = fetchSearch(type, search);

    data.then((value) => {
      setContent(value.results);
    });
  };

  const handleMoviesSearch = () => {
    setMoviesActive(true);
  };

  const handleSeriesSearch = () => {
    setMoviesActive(false);
    console.log(moviesActive);
  };

  const handleFormChange = (event) => {
    setSearch(event.target.value);
  };

  useDidMountEffect(() => {
    fetchData();
  }, [moviesActive]);

  return (
    <div className="search">
      {specific && (
        <Modal
          cast={cast}
          title={specific.title || specific.name}
          overview={specific.overview}
          poster={specific.poster_path}
          date={specific.first_air_date || specific.release_date}
          media_type="movie"
          id={specific.id}
        />
      )}
      <div className="container">
        <div className="search__form">
          <form onSubmit={handleSubmit}>
            <input
              className="form__text"
              type="text"
              onChange={handleFormChange}
            />
            <input className="form__button" type="submit" value="Search" />
          </form>
          <ul className="search__categories">
            <li
              className={`search__category ${
                moviesActive === true ? "active" : ""
              }`}
              onClick={handleMoviesSearch}
            >
              Search Movies
            </li>
            <li
              className={`search__category ${
                moviesActive === false ? "active" : ""
              }`}
              onClick={handleSeriesSearch}
            >
              Search TV Series
            </li>
          </ul>
        </div>
        <div className="trending__content">
          {content &&
            content.map((c) => {
              return (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type="movie"
                  vote_average={c.vote_average}
                  handleSpecific={handleSpecific}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
