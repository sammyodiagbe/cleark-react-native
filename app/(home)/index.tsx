import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { router } from "expo-router";
import useSignoutHook from "@/hooks/useSignoutHook";

import useSocketHook from "@/hooks/useSocketHook";
import { useQuery } from "convex/react";
import { api } from "../../api";

const Home = () => {
  const { sendHello } = useSocketHook();
  const { signout } = useSignoutHook();
  const tasks = useQuery(api.query.getTasks.getTasks, {});
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <SignedIn>
        <Text>You are currently authenticated woohoooo</Text>
        <Text>Tasks {tasks?.length}</Text>
        <Button title="Sign out" onPress={() => signout()}></Button>
        <Button
          onPress={() => {
            sendHello();
          }}
          title="Say Hello"
        />
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
