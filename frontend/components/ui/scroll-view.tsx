import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HScrollViewProps extends ScrollViewProps {
  requiresSafeArea?: boolean;
}

function HScrollView({
  requiresSafeArea = true,
  contentContainerStyle,
  className,
  ...props
}: HScrollViewProps) {
  if (requiresSafeArea)
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            { paddingHorizontal: 24, paddingVertical: 16 },
            contentContainerStyle,
          ]}
          {...props}
          className={`flex-1  ${className}`}
        >
          {props.children}
        </ScrollView>
      </SafeAreaView>
    );

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        { paddingHorizontal: 24, paddingVertical: 16 },
        contentContainerStyle,
      ]}
      {...props}
      className={`flex-1 bg-white  ${className}`}
    >
      {props.children}
    </ScrollView>
  );
}

export default HScrollView;
