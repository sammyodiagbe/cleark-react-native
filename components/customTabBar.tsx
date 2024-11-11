import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function CustomTabBar({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
          >
            {options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? "slateblue" : "#666",
              size: 24,
            })}
            {/* <Text
              style={[
                styles.tabText,
                { color: isFocused ? "slateblue" : "#666" },
              ]}
            >
              {label}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 20,
    marginHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    elevation: 0,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0", // Or any color you want
    borderRadius: 20, // Rounded corners
    padding: 8, // Inner padding
    flex: 1,
    elevation: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});
