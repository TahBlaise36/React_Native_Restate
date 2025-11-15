import { View, Text } from "react-native";
import React, { ReactNode } from "react";

interface SectionProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

const Section = ({ title, className, children }: SectionProps) => {
  return (
    <View className={`gap-4 ${className}`}>
      {title && (
        <Text className="text-xl text-black-300 font-rubik-semibold">
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

export default Section;
