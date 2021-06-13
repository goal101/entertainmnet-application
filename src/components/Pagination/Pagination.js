import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Pagination.css";

export default function Pagination({ page, total_pages, setPage }) {
  const handleForward = () => {
    if (page < total_pages) {
      setPage(page + 1);
      window.scroll(0, 0);
    }
  };

  const handleBackwards = () => {
    if (page > 1) {
      window.scroll(0, 0);
      setPage(page - 1);
    }
  };
  return (
    <div className="pagination">
      <div className="pagination__content">
        <div className="arrow" onClick={handleBackwards}>
          <ArrowBackIosIcon />
          Previous Page
        </div>
        <div>{page}</div>
        <div className="arrow" onClick={handleForward}>
          Next PAge
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
}
