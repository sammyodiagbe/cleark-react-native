import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const BatuScreen = () => {
  useEffect(() => {
    console.log("Mounted");
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{}}>Batu Screen</Text>
    </SafeAreaView>
  );
};

export default BatuScreen;
