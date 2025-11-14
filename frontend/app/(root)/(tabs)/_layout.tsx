import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

interface TabIconProps {
  title: string;
  icon: any;
  isFocused: boolean;
}

const TabIcon = ({ title, icon, isFocused }: TabIconProps) => (
  <View className="flex-col flex-1 gap-y-1 mt-3 items-center">
    <Image
      source={icon}
      tintColor={isFocused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${isFocused ? "text-primary-300" : "text-black-200"} w-full text-xs font-rubik-medium`}
    >
      {title}
    </Text>
  </View>
);

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "#0061FF0A",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" icon={icons.home} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Explore" icon={icons.search} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" icon={icons.person} isFocused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
