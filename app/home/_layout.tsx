import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import CustomTabBar from "@/components/customTabBar";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "slateblue",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/challenge"
        options={{
          title: "Challenge",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="flag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="credit-card" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
