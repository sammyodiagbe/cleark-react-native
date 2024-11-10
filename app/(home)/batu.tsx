import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, Alert } from "react-native";
import HeaderComponent from "@/components/headerComponent";
import LinearGradientWrapper from "@/components/LinearGradientWrapper";
import { useQuery } from "convex/react";
import { api } from "@/api";
import { Id } from "@/convex/_generated/dataModel";
import { router, useLocalSearchParams } from "expo-router";
import { QuizData } from "@/utils/types";
import useCountDownHook from "@/hooks/useCountDownHook";
import { useUser } from "@clerk/clerk-expo";
import { useLiveBatuContext } from "@/context/liveBatuProvider";
import OptionComponent from "@/components/OptionComponent";

const BatuScreen = () => {
  const { batuId } = useLocalSearchParams();
  const { user } = useUser();
  const { isInLiveBatu } = useLiveBatuContext();

  const batu = useQuery(api.query.batuQueries.getLiveBatuData, {
    batuId: batuId as Id<"livebatu">,
  });
  const quiz: QuizData | null = useQuery(
    api.query.batuQueries.getBatuQuestionData,
    {
      liveBatuId: batuId as Id<"livebatu">,
    }
  );
  const userData = useQuery(api.query.batuQueries.getUserBatuData, {
    batuId: batuId as Id<"livebatu">,
    userId: user?.id ?? "",
  });

  // const quiz = useQuery(api.query.batuQueries.getBatuQuestionData, {
  //   liveBatuId: liveBatu?._id as Id<"livebatu">,
  // });

  const { questions, currentQuestion, nextQuestionStartTime } = quiz ?? {};
  const { seconds } = useCountDownHook(
    new Date(nextQuestionStartTime! ?? null)
  );
  let progress = ((18 - seconds) / 18) * 100;
  if (!quiz) return <Text>No Quiz</Text>;
  return (
    <LinearGradientWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent />
        <Pressable
          onPress={() => {
            router.replace("/(home)");
          }}
        >
          <View style={{ padding: 20 }}>
            <Text>Go home</Text>
            <Text style={{ marginTop: 10, color: "white", fontSize: 24 }}>
              {batu?.ended ? "Batu Ended" : ""}
            </Text>
            <Text>{userData?.score}</Text>
          </View>
        </Pressable>
        <View style={{ padding: 20, gap: 20 }}>
          {progress > 0 && !batu?.ended && (
            <View
              style={{
                height: 10,
                width: `${progress}%`,
                backgroundColor: "white",
                marginBottom: 10,
                borderRadius: 20,
              }}
            />
          )}
          <Text style={{ color: "white", fontSize: 16 }}>
            Question {currentQuestion} of {questions?.length}
          </Text>
          <Text style={{ color: "white", fontSize: 24 }}>
            {questions ? questions![currentQuestion! - 1].question : ""}
          </Text>
          <View style={{ marginTop: 32, gap: 10 }}>
            {questions?.length &&
              questions![currentQuestion! - 1].options.map((option, index) => {
                return (
                  <OptionComponent
                    answer={questions![currentQuestion! - 1].answer}
                    option={option}
                    index={index}
                    userData={userData}
                    key={`${option}-${index}`}
                  />
                );
              })}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default BatuScreen;
