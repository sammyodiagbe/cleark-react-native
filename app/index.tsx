import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const tasks = useQuery(api.tasks.getTasks, {});
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Tasks {tasks?.length}</Text>
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
