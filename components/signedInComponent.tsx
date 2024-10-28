import { useSocketContext } from "@/context/socketContextProvider";
import useCountDownHook from "@/hooks/useCountDownHook";
import { Batu } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";

interface TComponent {
  batu: Batu | null;
  minutes: number;
  seconds: number;
  userInLive: boolean;
}
const SignedInComponent: FC<TComponent> = ({
  batu,
  minutes,
  seconds,
  userInLive,
}) => {
  const { minutes: nextBatuMinutes, seconds: nextBatuSeconds } =
    useCountDownHook(batu?.ends ?? null);
  const { user } = useUser();

  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on("joined-live-successful", () => {
        Alert.alert("You are all set for batu");
      });
    }
  }, [socket]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.headerContainer}>
        <View>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?u=user_25" }}
            style={styles.userProfile}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="diamond" size={18} color={"white"} />
            <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
              100
            </Text>
          </View>
          <View>
            <Ionicons name="settings" size={24} color={"white"} />
          </View>
        </View>
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
        <View
          style={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: "white",

            borderRadius: 20,
          }}
        >
          {batu?.started && (
            <Pressable>
              <Text style={{ color: "white", fontWeight: 500 }}>
                Continue batu
              </Text>
            </Pressable>
          )}

          <View></View>
        </View>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
          {userInLive ? "Joined" : "Join"}
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
            onPress={() => {
              if (!batu || batu?.started || batu?.ended || !user?.id) return;

              socket?.emit("join-live", {
                batuId: batu?._id,
                userId: user?.id,
              });
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
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
    borderWidth: 2,
    borderColor: "white",
  },

  userProfile: {
    height: 45,
    width: 45,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default SignedInComponent;
