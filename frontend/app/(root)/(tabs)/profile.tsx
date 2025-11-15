import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import HScrollView from "@/components/ui/scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { COLORS } from "@/constants/theme";
import NotificationBell from "@/components/notification-bell";
import images from "@/constants/images";
import Section from "@/components/section";
import SettingsCard from "@/components/settings-card";
import { settings } from "@/constants/data";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        headerLeft={
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-50 p-2 rounded-full"
          >
            <Image
              source={icons.backArrow}
              tintColor={COLORS.black[300]}
              className="size-6"
            />
          </TouchableOpacity>
        }
        headerMiddle={
          <Text className="text-black-300 text-lg font-rubik-medium">
            Profile
          </Text>
        }
        headerRight={<NotificationBell />}
      />
      <HScrollView requiresSafeArea={false}>
        <View className="items-center pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-50 p-2 rounded-full"
          >
            <Image source={images.avatar} className="size-32" />
            <Image
              source={icons.edit}
              className="size-6 absolute right-3 bottom-4"
            />
          </TouchableOpacity>
          <Text className="text-black-300 text-xl font-rubik-bold">
            Blaise B.
          </Text>
        </View>
        <View className="gap-4">
          <Section className="border-t border-t-primary-200 pt-4 gap-6">
            {settings.map((item) => (
              <SettingsCard
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </Section>
          <Section className="border-t border-t-primary-200 pt-4 gap-6">
            <SettingsCard
              title="Log Out"
              icon={icons.logout}
              textStyles="text-red-500"
            />
          </Section>
        </View>
      </HScrollView>
    </SafeAreaView>
  );
};

export default Profile;
