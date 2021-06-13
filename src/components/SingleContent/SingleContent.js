import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../config/config";

export default function SingleContent({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  handleSpecific,
}) {
  const handleClick = () => {
    handleSpecific(id);
  };
  return (
    <div className="singleContent" onClick={handleClick}>
      <div className="singleContent__image-container">
        <img src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
        <span>{vote_average}</span>
      </div>
      <b>{title}</b>
      <div className="singleContent_subTitle">
        <span>{media_type === "tv" ? "TV series" : "Movie"}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
