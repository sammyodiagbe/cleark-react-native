import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import SocketContextProvider from "@/context/socketContextProvider";
import LiveBatuProvider from "@/context/liveBatuProvider";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string
);

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ConvexProvider client={convex}>
          <SocketContextProvider>
            <LiveBatuProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="home"
                  options={{
                    headerShown: false,
                  }}
                />
                {/* Define batu as a stack screen instead of a tab */}
                <Stack.Screen
                  name="batu/index"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </LiveBatuProvider>
          </SocketContextProvider>
        </ConvexProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
