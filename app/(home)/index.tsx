import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut, useSession } from "@clerk/clerk-expo";
import { router } from "expo-router";

const Home = () => {
  const { session } = useSession();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <SignedIn>
        <Text>You are currently authenticated woohoooo</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are currently not authenticated</Text>
        <Button
          onPress={() => {
            router.replace("/(auth)/signup");
          }}
          title="Create account"
        />
      </SignedOut>
    </View>
  );
};

export default Home;
