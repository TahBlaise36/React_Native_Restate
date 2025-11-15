import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { COLORS } from "@/constants/theme";
import { router } from "expo-router";
import icons from "@/constants/icons";
import RatingCard from "./rating-card";

type VariantType = "sm" | "md" | "lg";

interface EstateCardProps {
  variant?: VariantType;
  item: EstateCard;
}

const EstateCard = ({ variant = "sm", item }: EstateCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLike = () => {
    setIsLiked((val) => !val);
  };

  if (variant === "md")
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(root)/properties/[id]",
            params: { id: item.id },
          })
        }
        className="bg-white p-4 rounded-2xl shadow-md "
      >
        <Pressable className="rounded-2xl overflow-hidden">
          <ImageBackground
            source={item.image}
            resizeMode="cover"
            className="w-full h-40"
          >
            <View className="flex-1 bg-black/40 p-3">
              <RatingCard rating={item.rating} />
            </View>
          </ImageBackground>
        </Pressable>
        <View className="flex-row justify-between items-end mt-2">
          <View className="flex-1 flex-col">
            <Text
              className="text-lg font-rubik-medium text-black-300"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text className="text-sm font-rubik text-black-100">
              {item.location}
            </Text>
            <Text className="text-lg font-rubik-medium text-black-300">
              {item.price}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLike}>
            <Image
              source={icons.heart}
              tintColor={isLiked ? "#eab308" : COLORS.black[100]}
              className="size-6 "
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );

  if (variant === "lg")
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(root)/properties/[id]",
            params: { id: item.id },
          })
        }
        className="w-56 rounded-2xl overflow-hidden"
      >
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          className="w-full h-72"
        >
          <View className="flex-1 bg-black/45 p-4">
            <View className="flex-1 flex-col justify-between">
              <RatingCard rating={item.rating} />
              <View className="flex-row justify-between items-end">
                <View className="flex-1 flex-col gap-1">
                  <Text
                    className="text-xl font-rubik-medium text-white"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-sm font-rubik text-gray-100">
                    {item.location}
                  </Text>
                  <Text className="text-xl font-rubik-medium text-white">
                    {item.price}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleLike}>
                  <Image
                    source={icons.heart}
                    tintColor={isLiked ? "#eab308" : "#ffffff"}
                    className="size-6 "
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(root)/properties/[id]",
          params: { id: item.id },
        })
      }
      className="flex-row gap-4 bg-white items-center p-4 rounded-2xl shadow-md w-full"
    >
      <View className="rounded-2xl overflow-hidden">
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          className="size-28"
        >
          <View className="flex-1 bg-black/40 p-2">
            <RatingCard rating={item.rating} />
          </View>
        </ImageBackground>
      </View>
      <View className="flex-1 flex-row justify-between ">
        <View className="flex-col gap-2 flex-1">
          <Text className="text-lg font-rubik-medium text-black-300">
            {item.title}
          </Text>
          <Text className="text-sm font-rubik text-black-100">
            {item.location}
          </Text>
        </View>
        <View className="flex-col justify-between items-end">
          <TouchableOpacity onPress={handleLike}>
            <Image
              source={icons.heart}
              tintColor={isLiked ? "#eab308" : COLORS.black[100]}
              className="size-6"
            />
          </TouchableOpacity>
          <Text className="text-lg font-rubik-medium text-black-300">
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EstateCard;
