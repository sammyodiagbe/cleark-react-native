import { View, Text, StyleSheet } from "react-native";

const batuStats = [
  { title: "Total Batu", value: 100 },
  { title: "Won", value: 20 },
  { title: "Lost", value: 80 },
];

const BatuStats = () => {
  return (
    <View style={styles.batuStatsContainer}>
      {batuStats.map((stat, index) => (
        <BatuStatsItem title={stat.title} value={stat.value} key={index} />
      ))}
    </View>
  );
};

const BatuStatsItem = ({ title, value }: { title: string; value: number }) => {
  return (
    <View style={styles.batuStatsItem}>
      <Text style={styles.batuStatsTitle}>{title}</Text>
      <Text style={styles.batuStatsValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  batuStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  batuStatsItem: {
    flex: 1,
    gap: 10,
    alignItems: "center",
  },
  batuStatsTitle: {
    color: "#777",
    fontWeight: "bold",
  },
  batuStatsValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#444",
  },
});

export default BatuStats;
