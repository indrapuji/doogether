import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/onboarding/SplashScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import StartScreen from "../screens/onboarding/StartScreen";

const Stack = createStackNavigator();

const OnboardingNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Start" component={StartScreen} options={{ title: null, headerShown: false }} />
    </Stack.Navigator>
  );
};

export default OnboardingNav;
