import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import HeaderComponent from "@/components/headerComponent";
import LinearGradientWrapper from "@/components/LinearGradientWrapper";

const BatuScreen = () => {
  useEffect(() => {
    console.log("Mounted");
  }, []);
  return (
    <LinearGradientWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent />
      </SafeAreaView>
    </LinearGradientWrapper>
  );
};

export default BatuScreen;
