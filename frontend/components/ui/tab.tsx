import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";

type VariantType = "default" | "nav";
interface TabProps {
  variant?: VariantType;
  category: string;
  value?: string;
  className?: string;
  onSelect: (title: string) => void;
}

const Tab = ({
  variant = "default",
  category,
  value,
  onSelect,
  className,
}: TabProps) => {
  const isActive = category === value;

  if (variant === "nav") {
    return (
      <Pressable
        onPress={() => onSelect(category)}
        className={` rounded-full ${isActive ? "bg-primary-300 h-3 w-8" : "bg-white size-3"} rounded-full ${className}`}
      ></Pressable>
    );
  }
  return (
    <Pressable
      onPress={() => onSelect(category)}
      className={` border ${isActive ? "bg-primary-300 border-primary-300" : "bg-primary-100 border-primary-200"}  flex-row py-2 px-4 rounded-full ${className}`}
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
