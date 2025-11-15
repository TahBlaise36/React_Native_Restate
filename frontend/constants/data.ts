import icons from "./icons";
import images from "./images";

export const cards: EstateCard[] = [
  {
    id: "01",
    title: "Lucky Lake Apartments",
    location: "Beijing, China",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    id: "02",
    title: "Home Away From Home",
    location: "Tokyo, Japan",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    id: "03",
    title: "Tranquil Tavern Apartments",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.Beijing,
  },
  {
    id: "04",
    title: "Tropicana Del Norte De Forte",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.china,
  },
];

export const featuredCards: EstateCard[] = [
  {
    id: "01",
    title: "Lucky Lake Apartments",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    id: "02",
    title: "Home Away From Home",
    location: "Tokyo, Japan",
    price: "$200",
    rating: 3,
    category: "flat",
    image: images.japan,
  },
];

export const categories: EstateCategory[] = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Condos", category: "Condos" },
  { title: "Duplexes", category: "Duplexes" },
  { title: "Studios", category: "Studios" },
  { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Others", category: "Others" },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.laundry,
  },
  {
    title: "Car Parking",
    icon: icons.carPark,
  },
  {
    title: "Sports Center",
    icon: icons.run,
  },
  {
    title: "Cutlery",
    icon: icons.cutlery,
  },
  {
    title: "Gym",
    icon: icons.dumbell,
  },
  {
    title: "Swimming pool",
    icon: icons.swim,
  },
  {
    title: "Wifi",
    icon: icons.wifi,
  },
  {
    title: "Pet Center",
    icon: icons.dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: images.japan,
  },
  {
    id: 2,
    image: images.newYork,
  },
  {
    id: 3,
    image: images.Beijing,
  },
  {
    id: 4,
    image: images.china,
  },
  // {
  //   id: 5,
  //   image: images.newYork,
  // },
  // {
  //   id: 6,
  //   image: images.japan,
  // },
];
