import React from "react";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import TvIcon from "@material-ui/icons/Tv";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="/">
                <WhatshotIcon />
                <span>Trending</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/movies">
                <MovieIcon />
                <span>Movies</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/series">
                <TvIcon />
                <span>Series</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/search">
                <SearchIcon />
                <span>Search</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
