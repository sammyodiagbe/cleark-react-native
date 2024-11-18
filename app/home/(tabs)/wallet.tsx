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
import { useUserContext } from "@/context/userProvider";
import { useCallback } from "react";
import UseCameraHook from "@/hooks/useCameraHook";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import CameraVerificationComponent from "@/components/cameraVerificationComponent";
const WalletScreen = () => {
  const { user } = useUserContext();
  const { permission, requestPermission } = UseCameraHook();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openPaymentSheet = async () => {
    const { customer, ephemeralKey, clientSecret } = await getPaymentData();

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

  const startWithdrawalProcess = useCallback(async () => {
    if (!permission) {
      await requestPermission();
    } else {
      if (!user.stripeConnectAccountLinked) {
        console.log(bottomSheetRef.current);
        await bottomSheetRef.current?.expand();
      } else {
        Alert.alert("Go ahead and withdraw funds");
      }
    }
  }, []);

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi, Samson</Text>
          <Text style={styles.headerSubText}>Your balance</Text>
          <Text style={styles.balance}>${user?.balance}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => openPaymentSheet()}
              style={[styles.actionButton, styles.addFunds]}
            >
              <Ionicons name="add-circle-sharp" size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Add funds</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={startWithdrawalProcess}
            >
              <Ionicons name="arrow-down-circle-sharp" size={18} />

              <Text>Withdraw funds</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TransactionActivityComponent />
        <CameraVerificationComponent bottomSheetRef={bottomSheetRef} />
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
