import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@react-navigation/elements";
import React, { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type MCIconType = ComponentProps<typeof MaterialCommunityIcons>["name"];
type variantType = "sm" | "lg";

type onActionType = () => void;

interface EmptyStateProps {
  variant?: variantType;
  title?: string;
  message?: string;
  actionLabel?: string;
  icon?: MCIconType;
  iconColor?: string;
  iconSize?: number;
  onAction?: onActionType;
  className?: string;
}

const EmptyState = ({
  variant = "sm",
  title = "No data found",
  message = "There’s nothing to show here yet.",
  actionLabel,
  icon = "bell-off-outline",
  iconColor = "#9E9E9E",
  iconSize = 42,
  onAction,
  className,
}: EmptyStateProps) => {
  if (variant === "sm") {
    return (
      <View
        className={`flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 h-52 ${className}`}
      >
        <MaterialCommunityIcons name={icon} size={40} color="#9e9e9e" />
        <Text className="mt-2 text-center text-gray-600 text-md font-rubik-medium">
          {title}
        </Text>
        {message && (
          <Text className="text-center text-gray-600 text-md font-rubik">
            {message}
          </Text>
        )}
        {actionLabel && onAction && (
          <Pressable onPress={onAction} className="mt-3 rounded-full px-4 py-2">
            <Text className="font-poppins-m text-white text-md">
              {actionLabel}
            </Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View
      className={`flex-1 items-center justify-center bg-white px-4 py-20 dark:bg-[#0C0C12] ${className}`}
    >
      <View className="mb-4 rounded-full bg-greyscale-100 p-4">
        <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />
      </View>

      <Text className="font-poppins-sb text-black-300 text-lg">{title}</Text>

      <Text className="mt-2 w-64 text-center text-black-200 text-md">
        {message}
      </Text>

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="mt-5 rounded-full px-6 py-2 bg-primary-300"
        >
          <Text className="font-rubik-medium text-white text-md">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmptyState;
