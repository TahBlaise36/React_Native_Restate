import { View } from "react-native";
export interface HeaderProps {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerBottom?: React.ReactNode;
}

const Header = ({ headerLeft, headerRight, headerBottom }: HeaderProps) => (
  <View className="flex-col gap-y-6">
    <View className="flex-row justify-between items-center px-6">
      {headerLeft}
      {headerRight}
    </View>
    <View className="px-6">{headerBottom}</View>
  </View>
);

export default Header;
