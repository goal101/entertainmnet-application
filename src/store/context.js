import { createContext, useState } from "react";
import axios from "axios";

// initial value of the context can be anything. in this case it is an object
const Context = createContext({
  contentDetails: [],
  handleDetails: () => {},
});

// job of providing this context to all components that need data from it
// also responsible for updating the context values
export function ContextProvider(props) {
  const [contentDetails, setContentDetails] = useState([]);
  const [cast, setCast] = useState([]);

  async function handleDetails(content, id) {
    const d = content.filter((c) => c.id === id);
    // setContentDetails(d[0]);
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    const { data } = await axios.get(url);

    setCast(data.cast);

    console.log(data.cast);

    document.body.style.overflow = "hidden";

    // setContentDetails(details);
  }

  const context = {
    contentDetails: contentDetails,
    handleDetails: handleDetails,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export default Context;
