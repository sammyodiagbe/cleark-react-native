import { View, ScrollView, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const transactions = [
  { type: "deposit", date: "2023-10-01", amount: 150.0, success: true },
  { type: "withdrawal", date: "2023-10-02", amount: 50.0, success: false },
  { type: "deposit", date: "2023-10-03", amount: 200.0, success: true },
  { type: "withdrawal", date: "2023-10-04", amount: 75.0, success: true },
  { type: "deposit", date: "2023-10-05", amount: 300.0, success: false },
];

const TransactionActivityComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities</Text>
      <FlatList
        data={transactions}
        renderItem={({ item, index }) => <TransactionItem transaction={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const TransactionItem = ({
  transaction,
}: {
  transaction: (typeof transactions)[0];
}) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionItemHeader}>
        <View style={styles.transactionItemAmountContainer}>
          <Text style={styles.transactionItemAmount}>
            ${transaction.amount}
          </Text>

          <Text style={styles.transactionItemDate}>{transaction.date}</Text>
        </View>
      </View>

      <Text style={styles.transactionType}>{transaction.type}</Text>
      {transaction.success ? (
        <Ionicons name="checkmark-circle" size={18} color="green" />
      ) : (
        <Ionicons name="close-circle" size={18} color="#ff0000" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  transactionItem: {
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 10,
  },
  transactionItemAmountContainer: {
    flex: 1,
    gap: 8,
  },
  transactionItemAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionItemDate: {
    fontSize: 12,
    color: "#777",
  },
  transactionItemHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionType: {
    color: "#777",
    backgroundColor: "#efefef",
    padding: 5,
    borderRadius: 10,
  },
});

export default TransactionActivityComponent;
