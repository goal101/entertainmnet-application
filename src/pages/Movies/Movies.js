import React, { useState, useEffect } from "react";
import Genres from "../../components/Genres/Genres";
import Pagination from "../../components/Pagination/Pagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Modal from "../../components/Modal/Modal";
import { fetchContent, handleSetSpecifit } from "../../api/api";

export default function Movies() {
  const useGenre = (gnrs) => {
    if (gnrs.length < 1) {
      return "";
    } else {
      const genreIds = gnrs.map((g) => g.id);
      return genreIds.reduce((acc, curr) => acc + "," + curr);
    }
  };

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  // eslint-disable-next-line
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
  const [specific, setSpecific] = useState();
  const [cast, setCast] = useState([]);

  const fetchMovies = () => {
    const data = fetchContent(page, genreforURL, "movie");

    data.then((value) => {
      setContent(value.results);
      setNumOfPages(value.total_pages);
    });
  };

  const handleSpecific = (id) => {
    const data = handleSetSpecifit(content, id, "movie");

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

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);
  return (
    <div className="movies">
      <div className="container">
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
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
        <Pagination page={page} total_pages={numOfPages} setPage={setPage} />
      </div>
    </div>
  );
}
