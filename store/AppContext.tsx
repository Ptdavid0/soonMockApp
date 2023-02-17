import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppContextType = {
  isOnboarding: boolean;
  authToken: string;
  setOnboardingDone: any;
  isAuthenticated: boolean;
  authenticate: any;
  logout: any;
  authUser: any;
};

export const AppContext = createContext<AppContextType>({
  isOnboarding: true,
  authToken: "",
  setOnboardingDone: () => {},
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  authUser: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState("");

  const authenticate = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  };

  const setOnboardingDone = () => {
    setIsOnboarding(false);
  };

  const authUser = (isAuthenticatedProp: boolean) => {
    setIsAuthenticated(isAuthenticatedProp);
  };

  const value = {
    isOnboarding,
    setOnboardingDone,
    authToken,
    isAuthenticated,
    authenticate,
    logout,
    authUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
