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
        <Text className="text-black-300 text-xl font-rubik-bold">{title}</Text>

        {navTitle && (
          <Pressable onPress={onNavigate}>
            <Text className="text-base font-rubik-medium text-primary-300">
              {navTitle}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default HeaderSecondary;
