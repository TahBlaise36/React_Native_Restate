import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";

interface HScrollViewProps extends ScrollViewProps {}

function HScrollView({
  contentContainerStyle,
  className,
  ...props
}: HScrollViewProps) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ paddingHorizontal: 24 }, contentContainerStyle]}
      {...props}
      className={`bg-white  ${className}`}
    >
      {props.children}
    </ScrollView>
  );
}

export default HScrollView;
