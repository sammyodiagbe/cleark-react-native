import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveUsersComponent from "@/components/activeUsersComponent";
const ChallengeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenge</Text>
        <Text style={styles.subtitle}>
          Invite your friends to a batu challenge
        </Text>
      </View>

      <ActiveUsersComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {},
});

export default ChallengeScreen;
