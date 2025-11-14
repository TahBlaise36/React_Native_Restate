import { View, Text, Button, Pressable } from "react-native";
import React from "react";

interface HeaderSecondaryProp {
  title: string;
  navTitle?: string;
  onNavigate?: () => void;
}

const HeaderSecondary = ({
  title,
  navTitle,
  onNavigate,
}: HeaderSecondaryProp) => {
  return (
    <View className="mb-3">
      <View className="flex-row justify-between ">
        <Text className="text-xl font-rubik-medium">{title}</Text>

        <Pressable onPress={onNavigate}>
          <Text className="text-base font-rubik text-primary-300">
            {navTitle}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderSecondary;
