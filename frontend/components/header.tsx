import { View } from "react-native";
export interface HeaderProps {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerMiddle?: React.ReactNode;
  headerBottom?: React.ReactNode;
  className?: string;
}

const Header = ({
  headerLeft,
  headerMiddle,
  headerRight,
  headerBottom,
  className,
}: HeaderProps) => (
  <View className={`flex-col gap-y-6 px-6 ${className}`}>
    <View className="flex-row justify-between items-center ">
      {headerLeft}
      {headerMiddle}
      {headerRight}
    </View>
    <View>{headerBottom}</View>
  </View>
);

export default Header;
