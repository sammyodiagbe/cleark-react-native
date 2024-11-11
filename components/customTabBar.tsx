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
            <Text
              style={[
                styles.tabText,
                { color: isFocused ? "slateblue" : "#666" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "orange",
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
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
