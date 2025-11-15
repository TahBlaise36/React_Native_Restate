import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface SettingsCardProps {
  icon?: ImageSourcePropType;
  title?: string;
  textStyles?: string;
}
const SettingsCard = ({ icon, title, textStyles }: SettingsCardProps) => {
  return (
    <View className="flex-row items-center gap-2">
      <Image source={icon} className="size-6" />
      <View className="flex-1">
        <Text
          className={`text-lg text-black-300 font-rubik-medium ${textStyles}`}
        >
          {title}
        </Text>
      </View>
      <Image source={icons.rightArrow} className="size-6" />
    </View>
  );
};

export default SettingsCard;
