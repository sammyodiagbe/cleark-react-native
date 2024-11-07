import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable } from "react-native";
import HeaderComponent from "@/components/headerComponent";
import LinearGradientWrapper from "@/components/LinearGradientWrapper";
import { useQuery } from "convex/react";
import { api } from "@/api";
import { Id } from "@/convex/_generated/dataModel";
import { router, useLocalSearchParams } from "expo-router";
import { Batu, QuizData } from "@/utils/types";
import useCountDownHook from "@/hooks/useCountDownHook";

const BatuScreen = () => {
  const { batuId } = useLocalSearchParams();
  const quiz: QuizData | null = useQuery(
    api.query.batuQueries.getBatuQuestionData,
    {
      liveBatuId: batuId as Id<"livebatu">,
    }
  );

  // const quiz = useQuery(api.query.batuQueries.getBatuQuestionData, {
  //   liveBatuId: liveBatu?._id as Id<"livebatu">,
  // });

  const { questions, currentQuestion, nextQuestionStartTime } = quiz ?? {};
  const { seconds } = useCountDownHook(
    new Date(nextQuestionStartTime! ?? null)
  );
  let progress = ((15 - seconds) / 15) * 100;
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
          <Text>Go home</Text>
        </Pressable>
        <View style={{ padding: 20, gap: 20 }}>
          <Text style={{ color: "white", fontSize: 15, alignSelf: "center" }}>
            {progress}
          </Text>
          <Text style={{ color: "white", fontSize: 15, alignSelf: "center" }}>
            {seconds}
          </Text>
          {progress > 0 && (
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
            {currentQuestion} of {questions?.length}
          </Text>
          <Text style={{ color: "white", fontSize: 24 }}>
            {questions ? questions![currentQuestion! - 1].question : ""}
          </Text>
          <View style={{ marginTop: 32, gap: 10 }}>
            {questions?.length &&
              questions![currentQuestion! - 1].options.map((option, index) => {
                return (
                  <Pressable onPress={() => {}}>
                    <View
                      key={`${Math.random()}-${index}`}
                      style={{ padding: 20, backgroundColor: "#7E1FFB" }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {option}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default BatuScreen;
