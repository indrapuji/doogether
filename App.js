import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingNav from "./src/navigations/OnboardingNav";

const App = () => {
  return (
    <NavigationContainer>
      <OnboardingNav />
    </NavigationContainer>
  );
};

export default App;
