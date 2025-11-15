import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

type VariantType = "sm" | "md";

interface FacilityProps {
  variant?: VariantType;
  icon?: ImageSourcePropType;
  title?: string;
}

const Facility = ({ icon, variant = "sm", title }: FacilityProps) => {
  if (variant === "md") {
    return (
      <View className="flex-col items-center gap-2">
        <View className="p-4 rounded-full bg-primary-100">
          <Image source={icon} resizeMode="contain" className="size-6" />
        </View>
        <Text className="text-black-300 font-rubik">{title}</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-2">
      <View className="p-3 rounded-full bg-primary-100">
        <Image source={icon} resizeMode="contain" className="size-5" />
      </View>
      <Text className="text-black-300 font-rubik-medium">8 Beds</Text>
    </View>
  );
};

export default Facility;
