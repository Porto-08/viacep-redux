import React from "react";
import { Provider } from "react-redux";
import SearchCep from "./components/SearchCep";
import store from "./store/configureStore";

const App = () => {
  return (
    <Provider store={store}>
      <SearchCep />
    </Provider>
  );
};

export default App;
