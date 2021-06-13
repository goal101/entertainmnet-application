import React, { useEffect, useState, useContext } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import Modal from "../../components/Modal/Modal";
import Context from "../../store/context";
import { fetchTrending, handleSetSpecifit } from "../../api/api";
import "./Trending.css";

export default function Trending() {
  const [content, setContent] = useState([]);
  const [specific, setSpecific] = useState();
  const [cast, setCast] = useState([]);

  const context = useContext(Context);

  const handleSpecific = (id) => {
    const data = handleSetSpecifit(content, id);

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
    const data = fetchTrending();
    data.then((value) => {
      setContent(value.results);
    });
  }, []);
  return (
    <div className="trending">
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
                  media_type={c.media_type}
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
