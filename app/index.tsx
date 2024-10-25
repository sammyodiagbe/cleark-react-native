import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.ts from file structure</Text>
      <Button
        onPress={() => {
          router.push("/(home)");
        }}
        title="Go honme"
      ></Button>
    </View>
  );
}
