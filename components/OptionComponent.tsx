import { api } from "@/api";
import { useLiveBatuContext } from "@/context/liveBatuProvider";
import { useMutation } from "convex/react";
import { FC } from "react";
import { Pressable, Text, Alert, View } from "react-native";

interface OptionComponentType {
  option: string;
  answer: string;
  userData: any;
  index: number;
}

const OptionComponent: FC<OptionComponentType> = ({
  answer,
  option,
  userData,
  index,
}) => {
  const updateUserData = useMutation(
    api.mutations.livebatuMutations.updateUserGameBatu
  );
  const { isInLiveBatu } = useLiveBatuContext();
  return (
    <Pressable
      onPress={async () => {
        if (!isInLiveBatu) return;
        if (answer === option) {
          await updateUserData({
            data: {
              dataId: userData?._id,
              score: userData?.score + 10,
              time: Date.now() - userData?.time,
            },
          });
        } else {
          Alert.alert("You are wrong");
        }
      }}
      key={`${option}-${index}`}
    >
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
};

export default OptionComponent;
