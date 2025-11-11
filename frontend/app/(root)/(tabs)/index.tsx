import { Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <Text className="text-3xl my-10 font-semibold font-rubik">
        Welcome to Restate
      </Text>
      <Link href="/sign-in" className="text-blue-500 mt-4">
        Sign In
      </Link>
      <Link href="/sign-up" className="text-blue-500 mt-4">
        Sign Up
      </Link>
      <Link href="/explore" className="text-blue-500 mt-4">
        Explore
      </Link>
    </SafeAreaView>
  );
}
