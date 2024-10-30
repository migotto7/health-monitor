import React, { useContext, useState, useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab.routes";
import { Context } from "../context/authContext";

const InnerRoutes = () => {
  const { isLogged } = useContext(Context);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const logged = await isLogged();
      setLoggedIn(logged);
    };
    checkLoginStatus();
  }, [isLogged]);

  if (loggedIn === null) return <Text>Loading...</Text>;

  return loggedIn ? <TabRoutes /> : <Text>Is not logged!</Text>;
};

export default function Routes() {
  return (
    <NavigationContainer>
      <InnerRoutes />
    </NavigationContainer>
  );
}