import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import HeaderComponent from "@/components/headerComponent";
import LinearGradientWrapper from "@/components/LinearGradientWrapper";
import { useQuery } from "convex/react";
import { api } from "@/api";
import { useLiveBatuContext } from "@/context/liveBatuProvider";
import { Id } from "@/convex/_generated/dataModel";
import { useLocalSearchParams } from "expo-router";
import { Batu, QuizData } from "@/utils/types";
import useCountDownHook from "@/hooks/useCountDownHook";

const BatuScreen = () => {
  const { batuId } = useLocalSearchParams();
  const [batu, setBatu] = useState<QuizData>();
  const quiz = useQuery(api.query.batuQueries.getBatuQuestionData, {
    liveBatuId: batuId as Id<"livebatu">,
  });

  // const quiz = useQuery(api.query.batuQueries.getBatuQuestionData, {
  //   liveBatuId: liveBatu?._id as Id<"livebatu">,
  // });

  const { questions, currentQuestion, nextQuestionStartTime } = quiz ?? {};
  const { seconds } = useCountDownHook(
    new Date(quiz?.nextQuestionStartTime! ?? null)
  );
  let progress = ((10 - seconds) / 10) * 100;
  if (!quiz) return <Text>No Quiz</Text>;
  return (
    <LinearGradientWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent />

        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 15, alignSelf: "center" }}>
            {seconds}
          </Text>
          {progress > 0 && (
            <View
              style={{
                height: 10,
                width: `${progress}%`,
                backgroundColor: "orange",
                marginBottom: 10,
                borderRadius: 20,
              }}
            />
          )}
          <Text style={{ color: "white", fontSize: 16 }}>
            {currentQuestion} of {questions?.length}
          </Text>
          <Text style={{ color: "white", fontSize: 24 }}>
            {questions ? questions![currentQuestion! - 1].question : ""}
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default BatuScreen;
