import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { number } from "zod";

const RatingCard = ({ rating }: { rating?: number }) => {
  return (
    <View className="bg-white flex-row py-[2px] px-[6px] gap-[2px] min-w-12 items-center justify-center rounded-full ml-auto">
      <Image source={icons.star} resizeMode="contain" className="size-3" />
      <Text className="text-[12px] font-rubik text-primary-300">{rating}</Text>
    </View>
  );
};

export default RatingCard;
