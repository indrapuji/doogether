import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import NavigationScreen from "./src/navigations";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationScreen />
    </Provider>
  );
};

export default App;
