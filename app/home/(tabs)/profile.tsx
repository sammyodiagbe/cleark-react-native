import { Text, View, Image, Switch, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useState } from "react";
import BatuStats from "@/components/batuStats";
const ProfileScreen = () => {
  const [isAutorouteEnabled, setIsAutorouteEnabled] = useState(false);
  const [isChallengeEnabled, setIsChallengeEnabled] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc" }}
            style={styles.image}
          />
          <Text style={styles.name}>John Doe</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.title}>Batu Stats</Text>
          <BatuStats />
        </View>
        <View
          style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }}
        >
          <Text style={{ marginBottom: 20, fontWeight: "bold" }}>
            Preferences
          </Text>
          <View style={{ gap: 10 }}>
            <View style={styles.preference}>
              <View style={{ gap: 5, flex: 1 }}>
                <Text
                  style={{
                    flexWrap: "wrap",
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 24,
                  }}
                >
                  Accept online challenges
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#8338ec" }}
                thumbColor={"#fff"}
                ios_backgroundColor={"#3e3e3e"}
                onValueChange={() => setIsChallengeEnabled(!isChallengeEnabled)}
                value={isChallengeEnabled}
              />
            </View>
            <View style={styles.preference}>
              <View style={{ gap: 5, flex: 1 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "#555" }}
                >
                  Autoroute
                </Text>
                <Text
                  style={{
                    flexWrap: "wrap",
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 24,
                  }}
                >
                  Automatically route to live batu when game starts{" "}
                  <Text style={{ color: "#333", fontWeight: "bold" }}>
                    (only applies if you have joined a livebatu)
                  </Text>
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#8338ec" }}
                thumbColor={"#fff"}
                ios_backgroundColor={"#3e3e3e"}
                onValueChange={() => setIsAutorouteEnabled(!isAutorouteEnabled)}
                value={isAutorouteEnabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontWeight: "bold",
  },
  stats: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    gap: 10,
    paddingVertical: 40,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
});

export default ProfileScreen;
