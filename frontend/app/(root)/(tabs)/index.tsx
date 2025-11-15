import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HScrollView from "@/components/ui/scroll-view";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { COLORS } from "@/constants/theme";
import SearchBar from "@/components/search-bar";
import Header from "@/components/header";
import Tab from "@/components/ui/tab";
import { useState } from "react";
import HeaderSecondary from "@/components/header-secondary";
import { cards, categories, featuredCards } from "@/constants/data";
import { router } from "expo-router";
import EmptyState from "@/components/empty-state";
import NotificationBell from "@/components/notification-bell";
import EstateCard from "@/components/estate-card";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutUp,
} from "react-native-reanimated";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCards = () => {
    let result = [...cards];
    if (selectedCategory !== "All") {
      result = result.filter(
        (c) =>
          c.category.toLocaleLowerCase() ===
          selectedCategory.toLocaleLowerCase()
      );
    }

    return result;
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        headerLeft={
          <View className="flex-row items-center gap-2 ">
            <Image
              source={images.avatar}
              resizeMode="contain"
              className="size-14"
            />
            <View>
              <Text className="text-sm text-black-100">Good Morning</Text>
              <Text className="text-lg text-black-300 font-rubik-medium">
                Blaise B.
              </Text>
            </View>
          </View>
        }
        headerRight={<NotificationBell />}
        headerBottom={
          <SearchBar onPress={() => router.push("/(root)/(tabs)/explore")} />
        }
      />
      <HScrollView requiresSafeArea={false}>
        <HeaderSecondary
          title="Featured"
          navTitle="See All"
          onNavigate={() => router.push("/(root)/(tabs)/explore")}
        />
        <FlatList
          data={featuredCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInLeft.delay(index * 100).springify()}
              exiting={FadeOutLeft.delay(500)}
              className=""
            >
              <EstateCard item={item} variant="lg" />
            </Animated.View>
          )}
          contentContainerStyle={{
            gap: 16,
            marginBottom: 24,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <HeaderSecondary
          title="Our Recommendation"
          navTitle="See All"
          onNavigate={() => router.push("/(root)/(tabs)/explore")}
        />
        <FlatList
          data={categories}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Tab
              category={item.category}
              value={selectedCategory}
              onSelect={(val) => setSelectedCategory(val)}
            />
          )}
          contentContainerStyle={{ gap: 12, marginBottom: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={filteredCards()}
          numColumns={2}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInUp.delay(index * 60).springify()}
              exiting={FadeOutUp.delay(200)}
              className="w-[48%]"
            >
              <EstateCard item={item} variant="md" />
            </Animated.View>
          )}
          ListEmptyComponent={
            <Animated.View
              key={selectedCategory}
              entering={FadeIn.delay(500)}
              exiting={FadeOut.delay(500)}
              className=""
            >
              <EmptyState
                variant="sm"
                title="No Estates Found!"
                message={`There are no ${selectedCategory.toLocaleLowerCase()} at the moment.`}
                className="mt-4"
              />
            </Animated.View>
          }
        />
      </HScrollView>
    </SafeAreaView>
  );
}
