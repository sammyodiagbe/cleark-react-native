import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import HeaderComponent from "@/components/headerComponent";
import LinearGradientWrapper from "@/components/LinearGradientWrapper";
import { useQuery } from "convex/react";
import { api } from "@/api";
import { useLiveBatuContext } from "@/context/liveBatuProvider";
import { Id } from "@/convex/_generated/dataModel";

const BatuScreen = () => {
  const { liveBatu } = useLiveBatuContext();
  const questions = useQuery(api.query.batuQueries.getBatuQuestionData, {
    liveBatuId: liveBatu?._id as Id<"livebatu">,
  });
  useEffect(() => {
    console.log("Mounted");
  }, []);
  return (
    <LinearGradientWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent />
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default BatuScreen;
