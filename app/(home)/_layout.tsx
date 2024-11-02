import LiveBatuProvider from "@/context/liveBatuProvider";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <LiveBatuProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LiveBatuProvider>
  );
}
