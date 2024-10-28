import { Button, Text, View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { router } from "expo-router";
import useSignoutHook from "@/hooks/useSignoutHook";

import useSocketHook from "@/hooks/useSocketHook";
import { useQuery } from "convex/react";
import { api } from "../../api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInMinutes, differenceInSeconds, min } from "date-fns";
import { Batu } from "@/utils/types";
import useCountDownHook from "@/hooks/useCountDownHook";
import { SafeAreaView } from "react-native-safe-area-context";
import SignedInComponent from "@/components/signedInComponent";

const Home = () => {
  const { sendHello } = useSocketHook();
  const { signout } = useSignoutHook();

  const [batu, setBatu] = useState<Batu>();
  const livebatu: Batu = useQuery(api.query.getLiveBatu.getActiveBatu);

  useEffect(() => {
    setBatu(livebatu);
  }, [livebatu]);

  const { minutes, seconds } = useCountDownHook(batu?.start ?? null, () => {});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "slateblue",
      }}
    >
      <SignedIn>
        <SignedInComponent
          batu={batu ?? null}
          minutes={minutes}
          seconds={seconds}
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
  );
};

export default Home;
