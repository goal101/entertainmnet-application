import React, { useEffect } from "react";
import axios from "axios";
import "./Genres.css";

export default function Genres({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      // unmount
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="genres">
      {selectedGenres.map((g) => {
        return (
          <div className="genre genre--active" onClick={() => handleRemove(g)}>
            <span>{g.name}</span>
          </div>
        );
      })}
      {genres.map((g) => {
        return (
          <div className="genre" onClick={() => handleAdd(g)}>
            <span>{g.name}</span>
          </div>
        );
      })}
    </div>
  );
}
