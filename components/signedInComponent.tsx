import useCountDownHook from "@/hooks/useCountDownHook";
import { Batu } from "@/utils/types";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

interface TComponent {
  batu: Batu | null;
  minutes: number;
  seconds: number;
}
const SignedInComponent: FC<TComponent> = ({ batu, minutes, seconds }) => {
  const { minutes: nextBatuMinutes, seconds: nextBatuSeconds } =
    useCountDownHook(batu?.ends ?? null);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View>
        <View></View>
        <View></View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ color: "white", fontWeight: 700, fontSize: 24 }}>
          batu {batu?.started ? "ends" : "starts"} in
        </Text>
        <Text
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "white",
            alignSelf: "center",
          }}
        >
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={{ flexDirection: "row" }}>
            {[...Array(3).keys()].map((value, index) => {
              return (
                <Image
                  source={{
                    uri: `https://i.pravatar.cc/80?u=user_${index}`,
                  }}
                  style={[
                    styles.profileImage,
                    { marginLeft: index > 0 ? -(45 / 2) : 0 },
                  ]}
                />
              );
            })}
          </View>
          <Text style={{ color: "white", fontWeight: 600 }}>100+</Text>
        </View>
        <View>
          <Pressable
            disabled={batu?.started}
            onPress={() => {
              console.log("working");
            }}
          >
            <View style={styles.button}>
              <Text style={{ color: "white", fontWeight: 600 }}>
                {!batu?.started
                  ? "Enter batu now"
                  : `Next batu in ${nextBatuMinutes <= 9 ? `0${nextBatuMinutes}` : nextBatuMinutes}:${nextBatuSeconds <= 9 ? `0${nextBatuSeconds}` : nextBatuSeconds}`}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    shadowColor: "#45caf50",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "slateblue",
  },
});

export default SignedInComponent;
