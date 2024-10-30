import { Text, View, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const HeaderComponent = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userProfile: {
    height: 45,
    width: 45,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default HeaderComponent;
