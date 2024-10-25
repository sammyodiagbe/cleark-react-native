import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut, useSession } from "@clerk/clerk-expo";
import { router } from "expo-router";
import useSignoutHook from "@/hooks/useSignoutHook";

const Home = () => {
  const { signout } = useSignoutHook();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <SignedIn>
        <Text>You are currently authenticated woohoooo</Text>
        <Button title="Sign out" onPress={() => signout()}></Button>
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
    </View>
  );
};

export default Home;
