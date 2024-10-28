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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "slateblue",
      }}
    >
      <SignedIn>
        <Text style={{ color: "white", fontWeight: 700, fontSize: 24 }}>
          batu {batu?.started ? "ends" : "starts"} in{" "}
        </Text>
        <Text style={{ fontSize: 80, fontWeight: "bold", color: "white" }}>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
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
