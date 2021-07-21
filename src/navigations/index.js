import React, { useEffect, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/Context";

import LoadScreen from "../screens/LoadScreen";
import SplashScreen from "../screens/onboarding/SplashScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import StartScreen from "../screens/onboarding/StartScreen";
import HomeScreen from "../screens/home/HomeScreen";
import TodoScreen from "../screens/home/TodoScreen";
import PostScreen from "../screens/home/PostScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  const isLogin = AsyncStorage.getItem("userToken");

  useEffect(() => {
    checkToken();
  }, [isLogin]);

  const checkToken = async () => {
    let getToken = await AsyncStorage.getItem("userToken");
  };

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userLat: null,
    userLong: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          userLat: action.lat,
          userLong: action.long,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          userLat: action.lat,
          userLong: action.long,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          userLat: null,
          userLong: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userToken) => {
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userLat", userLat);
          await AsyncStorage.setItem("userLong", userLong);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", token: userToken, lat: userLat, long: userLong });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userLat = await AsyncStorage.getItem("userLat");
        userLong = await AsyncStorage.getItem("userLong");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIVE_TOKEN", token: userToken, lat: userLat, long: userLong });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <LoadScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          headerMode="screen"
          screenOptions={{
            headerTintColor: "black",
            headerStyle: { backgroundColor: "#e3fdfd" },
          }}
        >
          {loginState.userToken !== null ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: null, headerShown: false }}
              />
              <Stack.Screen
                name="Todo"
                component={TodoScreen}
                options={{ title: null, headerShown: false }}
              />
              <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{ title: null, headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ title: null, headerShown: false }}
              />
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ title: null, headerShown: false }}
              />
              <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{ title: null, headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
