import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

const CameraVerificationComponent = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOnChange = useCallback((index: number) => {
    console.log("index", index);
  }, []);
  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleOnChange}
        snapPoints={["50%"]}
      >
        <BottomSheetView style={styles.container}>
          <Text>Hello</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default CameraVerificationComponent;
