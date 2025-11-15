import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cards, categories } from "@/constants/data";
import { router } from "expo-router";
import { COLORS } from "@/constants/theme";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import HScrollView from "@/components/ui/scroll-view";
import Header from "@/components/header";
import icons from "@/constants/icons";
import NotificationBell from "@/components/notification-bell";
import SearchBar from "@/components/search-bar";
import Tab from "@/components/ui/tab";
import HeaderSecondary from "@/components/header-secondary";
import EstateCard from "@/components/estate-card";
import EmptyState from "@/components/empty-state";

function formatEmptyListMessage({
  activeFilter,
  searchQuery,
}: {
  activeFilter: string;
  searchQuery: string;
}) {
  if (searchQuery.trim()) {
    return `No ${activeFilter !== "All" ? activeFilter : "estates"} match "${searchQuery}". Try a different keyword.`;
  }
  return `There is no ${activeFilter.toLocaleLowerCase()} at the moment.`;
}

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const emptymessage = formatEmptyListMessage({
    activeFilter: selectedCategory,
    searchQuery,
  });

  const filteredCards = useMemo(() => {
    let result = [...cards];
    if (selectedCategory !== "All") {
      result = result.filter(
        (c) =>
          c.category.toLocaleLowerCase() ===
          selectedCategory.toLocaleLowerCase()
      );
    }

    if (searchQuery.trim()) {
      result = result.filter((c) =>
        c.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    }

    return result;
  }, [cards, selectedCategory, searchQuery]);

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
              resizeMode="contain"
              tintColor={COLORS.black[300]}
              className="size-6"
            />
          </TouchableOpacity>
        }
        headerMiddle={
          <Text className="text-black-300 text-lg font-rubik-medium">
            Search for Your Ideal Home
          </Text>
        }
        headerRight={<NotificationBell />}
        headerBottom={
          <View className="flex-col gap-6">
            <SearchBar
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
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
              contentContainerStyle={{ gap: 12, marginBottom: 0 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <HeaderSecondary
              title={`Found ${filteredCards.length} ${selectedCategory !== "All" ? selectedCategory : "estates"} ${searchQuery ? `match "${searchQuery}"` : ""}`}
            />
          </View>
        }
      />

      <HScrollView
        className=""
        contentContainerStyle={{ flex: 1 }}
        requiresSafeArea={false}
      >
        <FlatList
          data={filteredCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInUp.delay(index * 60).springify()}
              exiting={FadeOutUp.delay(200)}
            >
              <EstateCard item={item} variant="sm" />
            </Animated.View>
          )}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            gap: 16,
            marginBottom: 24,
          }}
          ListEmptyComponent={
            <Animated.View
              key={selectedCategory}
              entering={FadeIn.delay(500)}
              exiting={FadeOut.delay(500)}
              className="flex-1"
            >
              <EmptyState
                variant="lg"
                title="No Estates Found!"
                message={emptymessage}
                actionLabel={searchQuery ? "clear filter" : ""}
                onAction={() => setSearchQuery("")}
              />
            </Animated.View>
          }
        />
      </HScrollView>
    </SafeAreaView>
  );
};

export default Explore;
