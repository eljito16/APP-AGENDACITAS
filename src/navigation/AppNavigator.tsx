import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import MainTabsNavigator from "./MainTabsNavigator";

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <MainTabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}