import {
  View,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cards, facilities, gallery } from "@/constants/data";
import { COLORS } from "@/constants/theme";
import HScrollView from "@/components/ui/scroll-view";
import images from "@/constants/images";
import Header from "@/components/header";
import icons from "@/constants/icons";
import Facility from "@/components/facility";
import Section from "@/components/section";
import Tab from "@/components/ui/tab";

const Property = () => {
  const { id } = useLocalSearchParams();
  const item = cards.find((c) => c.id === id);
  const [isLiked, setIsLiked] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(item?.image);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % gallery.length;
        setDisplayedImage(gallery[nextIndex].image);
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setIsLiked((val) => !val);
  };
  const handleChangeImage = (image: string, index: number) => {
    setDisplayedImage(image);
    setCurrentIndex(index);
  };
  return (
    <View className="bg-white flex-1">
      <StatusBar />
      <HScrollView
        contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        requiresSafeArea={false}
      >
        <Animated.View
          key={displayedImage}
          entering={FadeIn.duration(700)}
          exiting={FadeOut.duration(700)}
        >
          <ImageBackground
            source={displayedImage}
            resizeMode="cover"
            className="w-full h-96"
          >
            <View className="flex-1 bg-black/45 py-6 items-center justify-between">
              <Header
                className="w-full mt-6 px-0"
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
                headerRight={
                  <View className="flex-row gap-4 items-center">
                    <TouchableOpacity onPress={handleLike}>
                      <Image
                        source={icons.heart}
                        resizeMode="contain"
                        tintColor={isLiked ? "#eab308" : "#fff"}
                        className="size-7"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={icons.send}
                        resizeMode="contain"
                        tintColor={"#fff"}
                        className="size-7"
                      />
                    </TouchableOpacity>
                  </View>
                }
              />
              <View className="flex-row items-center gap-2">
                {gallery.map((img, index) => (
                  <Tab
                    key={img.id}
                    variant="nav"
                    value={displayedImage}
                    category={img.image}
                    onSelect={(val) => handleChangeImage(val, index)}
                  />
                ))}
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
        <View className="gap-6 mb-4 py-4 px-6">
          <Section
            title={item?.title}
            className="pb-6 border-b border-b-primary-200"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-primary-100 px-4 py-1 rounded-full">
                <Text className="text-primary-300 text-sm font-rubik-bold uppercase">
                  {item?.category}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Image source={icons.star} className="size-4" />
                <Text className="text-sm font-rubik text-black-300">
                  {item?.rating} (1,275 reviews)
                </Text>
              </View>
            </View>
            <View className="flex-row gap-6">
              <Facility icon={icons.bed} title="8 Beds" />
              <Facility icon={icons.bath} title="8 Bath" />
              <Facility icon={icons.area} title="2000 sqft" />
            </View>
          </Section>

          <Section title="Agent">
            <View className="flex-row items-center gap-4">
              <Image
                source={images.avatar}
                resizeMode="contain"
                className="size-16"
              />
              <View className="flex-1">
                <Text className="text-xl font-rubik-medium text-black-300">
                  Natasya Wilodra
                </Text>
                <Text className="text-md font-rubik-medium text-black-200">
                  Owner
                </Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Image source={icons.chat} className="size-8" />
                <Image source={icons.phone} className="size-8" />
              </View>
            </View>
          </Section>

          <Section title="Overview">
            <Text className="text-md font-rubik text-black-200 leading-6">
              Sleek, modern 2-bedroom apartment with open living space, high-end
              finishes, and city views. Minutes from downtown, dining, and
              transit.
            </Text>
          </Section>

          <Section title="Facilities">
            <FlatList
              data={facilities}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <Facility variant="md" icon={item.icon} title={item.title} />
              )}
              numColumns={4}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 16,
                paddingHorizontal: 8,
              }}
              scrollEnabled={false}
            />
          </Section>

          <Section title="Gallery">
            <FlatList
              data={gallery}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="rounded-2xl overflow-hidden">
                  <ImageBackground
                    source={item.image}
                    resizeMode="cover"
                    className="size-28"
                  >
                    <View className="flex-1 bg-black/40"></View>
                  </ImageBackground>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator
              contentContainerStyle={{ gap: 16 }}
            />
          </Section>

          <Section title="Location">
            <View className="flex-row items-center gap-2 mb-2">
              <Image
                source={icons.location}
                resizeMode="contain"
                className="size-5"
              />

              <Text className="text-black-300 font-rubik-medium">
                Grand City St. 100, New York, United States
              </Text>
            </View>
            <Image
              source={images.map}
              resizeMode="cover"
              className="w-full h-52 rounded-3xl"
            />
          </Section>

          <View className={`gap-4 `}>
            <View className="flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <View className="flex-1">
                <Text className="text-black-300 font-rubik-medium">
                  4.8 (1,275 reviews)
                </Text>
              </View>
              <Text className="text-primary-300 font-rubik-medium">
                See All
              </Text>
            </View>
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Image
                  source={images.avatar}
                  resizeMode="contain"
                  className="size-10"
                />
                <Text className="text-md font-rubik-semibold text-black-300">
                  Charolette Hanlin{" "}
                </Text>
              </View>
              <Text className="text-md font-rubik text-black-200 leading-6">
                The apartment is very clean and modern. I really like the
                interior design. Looks like I'll feel at home 😍
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-2">
              <View className="flex-row items-center gap-2">
                <Image
                  source={icons.heart}
                  tintColor={COLORS.primary[300]}
                  className="size-5"
                />
                <Text className="text-black-300 font-rubik-medium">938</Text>
              </View>
              <Text className="text-black-100 font-rubik-medium">
                6 hours ago
              </Text>
            </View>
          </View>
        </View>
      </HScrollView>
      <View className="px-8 pt-5 pb-8 flex-row items-center justify-between bg-white border border-primary-200 rounded-t-3xl">
        <View>
          <Text className="text-black-200 text-base font-rubik-medium rounded-full capitalize">
            price
          </Text>
          <Text className="text-primary-300 text-xl font-rubik-bold rounded-full">
            {item?.price}
          </Text>
        </View>
        <TouchableOpacity className="bg-primary-300 px-6 py-2 rounded-full">
          <Text className="text-white text-md font-rubik-medium ">
            Booking Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Property;
