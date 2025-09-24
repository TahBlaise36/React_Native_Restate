import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="explore"
        options={{ title: "Explore", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Sign In", headerShown: false }}
      />
    </Tabs>
  );
};

export default RootLayout;
