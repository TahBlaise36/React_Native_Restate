import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";

interface TabProps {
  category: string;
  value?: string;
  onSelect: (title: string) => void;
}

const Tab = ({ category, value, onSelect }: TabProps) => {
  const isActive = category === value;
  return (
    <Pressable
      onPress={() => onSelect(category)}
      className={` border ${isActive ? "bg-primary-300 border-primary-300" : "bg-primary-100 border-primary-200"}  flex-row py-2 px-4 rounded-full`}
    >
      <Text
        className={`text-md font-rubik ${isActive ? "text-white" : "text-black-300"}`}
      >
        {category}
      </Text>
    </Pressable>
  );
};

export default Tab;
