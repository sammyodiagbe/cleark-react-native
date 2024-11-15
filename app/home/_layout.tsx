import { Tabs } from "expo-router";
import CustomTabBar from "@/components/customTabBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserProvider from "@/context/userProvider";
export default function TabLayout() {
  return (
    <UserProvider>
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
              <Ionicons size={28} name="home-sharp" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/challenge"
          options={{
            title: "Challenge",
            tabBarIcon: ({ color }) => (
              <Ionicons name="flag-sharp" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="person-sharp" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="(tabs)/wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => (
              <Ionicons name="wallet-sharp" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
