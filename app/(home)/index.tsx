import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import useSignoutHook from "@/hooks/useSignoutHook";
import { useQuery } from "convex/react";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { Batu } from "@/utils/types";
import useCountDownHook from "@/hooks/useCountDownHook";
import { SafeAreaView } from "react-native-safe-area-context";
import SignedInComponent from "@/components/signedInComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Id } from "@/convex/_generated/dataModel";
import { useLiveBatuContext } from "@/context/liveBatuProvider";
const Home = () => {
  const { signout } = useSignoutHook();
  const { user } = useUser();

  const { liveBatu, isInLiveBatu } = useLiveBatuContext();

  const { minutes, seconds } = useCountDownHook(
    (liveBatu?.started ? liveBatu?.ends : liveBatu?.start) ?? null,
    () => {
      if (liveBatu?.started && isInLiveBatu) {
        router.replace("/(home)/batu");
      }
    }
  );

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
        }}
      >
        <SignedIn>
          <SignedInComponent
            batu={liveBatu ?? null}
            minutes={minutes}
            seconds={seconds}
            userInLive={isInLiveBatu}
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
