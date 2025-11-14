import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { COLORS } from "@/constants/theme";

interface SearchBarProps {
  onChangeText?: () => void;
  onPress?: () => void;
}

const SearchBar = ({ onChangeText, onPress }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <Pressable
      onPress={onPress}
      className={`w-full flex-row bg-gray-50 rounded-lg px-4 items-center gap-x-2 border ${isFocused ? "border-primary-300" : "border-primary-100"} `}
    >
      <Pressable>
        <Image
          source={icons.search}
          resizeMode="contain"
          tintColor={COLORS.black[100]}
          className="size-6"
        />
      </Pressable>
      <TextInput
        className="flex-1 py-5"
        placeholder="Search something"
        placeholderTextColor={COLORS.black[100]}
        onChangeText={onChangeText}
        // focusable={isFocused}

        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Image
        source={icons.filter}
        tintColor={COLORS.black[100]}
        className="size-6"
      />
    </Pressable>
  );
};

export default SearchBar;
