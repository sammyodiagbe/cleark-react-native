import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { router } from "expo-router";
import useSignoutHook from "@/hooks/useSignoutHook";
import { SafeAreaView } from "react-native-safe-area-context";
import SignedInComponent from "@/components/signedInComponent";
import { LinearGradient } from "expo-linear-gradient";
import { useUserContext } from "@/context/userProvider";
const Home = () => {
  const { signout } = useSignoutHook();
  const { user } = useUserContext();
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#650ED8", "#9148F2", "#843FDF"]}
    >
      <SafeAreaView
        style={{
          flex: 1,
          marginBottom: 80,
        }}
      >
        <SignedIn>
          <Text>{user?.email_address}</Text>
          <SignedInComponent />
        </SignedIn>
        <SignedOut>
          <Text>You are currently not authenticated</Text>
          <Button
            onPress={() => {
              router.replace("/(auth)/signup");
            }}
            title="Create account"
          />
          <Button
            onPress={() => {
              router.replace("/(auth)/signin");
            }}
            title="Sign in "
          />
        </SignedOut>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
