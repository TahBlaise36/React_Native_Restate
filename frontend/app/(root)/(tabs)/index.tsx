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
        headerRight={
          <View className="relative">
            <Image
              source={icons.bell}
              resizeMode="contain"
              tintColor={COLORS.black[300]}
              className="size-7"
            />
            <View className="absolute size-2 bg-primary-300 rounded-full -right-0 -top-0">
              <Text className="text-white text-sm">3</Text>
            </View>
          </View>
        }
        headerBottom={
          <SearchBar onPress={() => router.push("/(root)/(tabs)/explore")} />
        }
      />
      <HScrollView requiresSafeArea={false}>
        <HeaderSecondary title="Featured" navTitle="See All" />
        <FlatList
          data={featuredCards}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Pressable className="w-56 rounded-2xl overflow-hidden">
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                className="w-full h-72 p-4 hover:scale-105"
              >
                <View className="flex-1 flex-col justify-between">
                  <View className="bg-white flex-row py-1 px-2 gap-1 items-center rounded-full ml-auto">
                    <Image
                      source={icons.star}
                      resizeMode="contain"
                      className="size-4"
                    />
                    <Text className="text-sm font-rubik text-primary-300">
                      {item.rating}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-end">
                    <View className="flex-col gap-1">
                      <Text
                        className="text-xl font-rubik-medium text-white"
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text className="text-sm font-rubik text-gray-100">
                        {item.location}
                      </Text>
                      <Text className="text-xl font-rubik-medium text-white">
                        {item.price}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={icons.heart}
                        resizeMode="contain"
                        className="size-6 "
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          )}
          contentContainerStyle={{
            gap: 16,
            marginBottom: 16,
          }}
          // ItemSeparatorComponent={}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <HeaderSecondary title="Our Recommendation" navTitle="See All" />
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
          showsVerticalScrollIndicator={false}
          horizontal
        />
        <FlatList
          data={filteredCards()}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item.title}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          contentContainerStyle={{}}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-2xl shadow-md w-[48%]">
              <Pressable className="rounded-2xl overflow-hidden">
                <ImageBackground
                  source={item.image}
                  resizeMode="cover"
                  className="w-full h-40 p-3"
                >
                  <View className="bg-white flex-row py-1 px-2 gap-1 items-center rounded-full ml-auto">
                    <Image
                      source={icons.star}
                      resizeMode="contain"
                      className="size-4"
                    />
                    <Text className="text-sm font-rubik text-primary-300">
                      {item.rating}
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
              <View className="flex-row justify-between items-end mt-2">
                <View className="flex-col">
                  <Text
                    className="text-lg font-rubik-medium text-black-300"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-sm font-rubik text-black-100">
                    {item.location}
                  </Text>
                  <Text className="text-lg font-rubik-medium text-black-300">
                    {item.price}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={icons.heart}
                    resizeMode="contain"
                    className="size-6 "
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </HScrollView>
    </SafeAreaView>
  );
}
