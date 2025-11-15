import { View, Text, Image } from "react-native";
import icons from "@/constants/icons";
import { COLORS } from "@/constants/theme";

const NotificationBell = () => {
  return (
    <View className="relative">
      <Image
        source={icons.bell}
        resizeMode="contain"
        tintColor={COLORS.black[300]}
        className="size-7"
      />
      <View className="absolute size-5 items-center justify-center bg-primary-300 rounded-full -right-1 -top-2">
        <Text className="text-white text-sm font-rubik-medium">3</Text>
      </View>
    </View>
  );
};

export default NotificationBell;
