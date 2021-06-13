import React from "react";
import { img_500, img_300, noPicture, unavailable } from "../../config/config";

import "./Modal.css";

export default function Modal({
  title,
  poster,
  date,
  overview,
  id,
  media_type,
  cast,
}) {
  console.log(cast);
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal__image-container">
          <img src={poster ? `${img_500}${poster}` : unavailable} alt={title} />
        </div>
        <div className="modal__content-info">
          <h1>{title}</h1>
          <p>{overview}</p>
          <div className="cast__members">
            {cast.map((c) => {
              return (
                <div className="cast__member">
                  <img
                    src={
                      c.profile_path
                        ? `${img_300}/${c.profile_path}`
                        : noPicture
                    }
                    alt={c?.name}
                  />
                  <b>{c.name}</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
