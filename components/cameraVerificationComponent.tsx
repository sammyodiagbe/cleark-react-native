import { View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";

interface TComp {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const CameraVerificationComponent = ({ bottomSheetRef }: TComp) => {
  const handleOnChange = useCallback((index: number) => {}, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.close();
      };
    }, [])
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleOnChange}
      snapPoints={["25%", "50%", "70%", "100%"]}
      containerStyle={{ zIndex: 1000 }}
      enablePanDownToClose={true}
      style={{
        zIndex: 1000,
      }}
    >
      <BottomSheetView style={{ flex: 1, padding: 20 }}>
        <Text style={styles.headerText}>
          Why do i need to verify my identity?
        </Text>
      </BottomSheetView>
    </BottomSheet>
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  headerText: {
    color: "#777",
    fontWeight: "bold",
  },
});

export default CameraVerificationComponent;
