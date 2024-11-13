import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionActivityComponent from "@/components/transactionActivity";
import {
  StripeProvider,
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { getPaymentData } from "@/utils/helpers";
const WalletScreen = () => {
  const openPaymentSheet = async () => {
    const { customer, ephemeralKey, clientSecret } = await getPaymentData();
    console.log(customer, ephemeralKey, clientSecret);
    const { error } = await initPaymentSheet({
      returnURL: "https://www.google.com",
      merchantDisplayName: "Brainbatu, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,

      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      await presentPaymentSheet();
    }
  };
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi, Samson</Text>
          <Text style={styles.headerSubText}>Your balance</Text>
          <Text style={styles.balance}>$750.25</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => openPaymentSheet()}
              style={[styles.actionButton, styles.addFunds]}
            >
              <Ionicons name="add-circle-sharp" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Add funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="arrow-down-circle-sharp" size={18} />

              <Text>Withdraw funds</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TransactionActivityComponent />
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    padding: 20,
  },
  actionContainer: {
    flexDirection: "row",

    gap: 10,
  },
  addFunds: {
    backgroundColor: "green",
    color: "#fff",
  },
  actionButtonText: {
    color: "#fff",
  },
  actionButton: {
    backgroundColor: "#cfcfcf",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#555",
  },
  headerSubText: {
    fontSize: 14,
    color: "#777",
  },
  balance: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#444",
  },
  container: {
    flex: 1,

    backgroundColor: "#efefef",
    padding: 20,
  },
});

export default WalletScreen;
