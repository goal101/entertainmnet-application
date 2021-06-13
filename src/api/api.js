import axios from "axios";
export async function handleSetSpecifit(content, id, type) {
  const d = content.filter((c) => c.id === id);

  const url = `https://api.themoviedb.org/3/${
    d[0].media_type || type
  }/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  const { data } = await axios.get(url);

  return [d[0], data.cast];
}

export async function fetchSearch(type, search) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`
  );

  return data;
}

export async function fetchTrending() {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
  );

  return data;
}

export async function fetchContent(page, genreforURL, type) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
  );

  return data;
}
