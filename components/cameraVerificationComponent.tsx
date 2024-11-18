import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

interface TComp {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const CameraVerificationComponent = ({ bottomSheetRef }: TComp) => {
  const handleOnChange = useCallback((index: number) => {
    console.log("index", index);
  }, []);
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "red",
        zIndex: 200,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleOnChange}
        snapPoints={["25%", "50%", "100%"]}
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
    backgroundColor: "red",
  },
});

export default CameraVerificationComponent;
