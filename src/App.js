import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Header from "./components/Header/Header";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
// import "normalize.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <HashRouter>
        <Switch>
          <Route path="/" exact={true} component={Trending} />
          <Route path="/movies" exact={true} component={Movies} />
          <Route path="/series" exact={true} component={Series} />
          <Route path="/search" exact={true} component={Search} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
