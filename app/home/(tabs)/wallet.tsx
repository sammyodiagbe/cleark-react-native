import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionActivityComponent from "@/components/transactionActivity";
import WebView from "react-native-webview";
import {
  StripeProvider,
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { getPaymentData, url } from "@/utils/helpers";
import { useUserContext } from "@/context/userProvider";
import { useCallback, useState } from "react";
import UseCameraHook from "@/hooks/useCameraHook";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import VerificationModal from "@/components/verificationModal";

const WalletScreen = () => {
  const { user } = useUserContext();
  const { permission, requestPermission } = UseCameraHook();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [accountLinkURL, setAccountLinkURL] = useState("");
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
        console.log(user);
        // create an account link
        const connectAccount = await fetch(
          `${url}/stripe/connect/account/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docId: user._id,
              email: user.email,
            }),
          }
        );
        console.log("connect account");
        const { accountId } = await connectAccount.json();

        console.log("account id", accountId);
        const accountLink = await fetch(`${url}/stripe/connect/account/link`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: user.stripeConnectAccountId,
          }),
        });

        const { link } = await accountLink.json();
        console.log("account link", link);
        if (link) {
          setOpenVerificationModal(true);
          setAccountLinkURL(link.url);
        }

        // setOpenVerificationModal(true);
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
        <GestureHandlerRootView
          style={{ flex: 1, padding: 20, paddingBottom: 0 }}
        >
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

          <VerificationModal
            visible={openVerificationModal}
            setOpenVerificationModal={setOpenVerificationModal}
            accountLinkURL={accountLinkURL}
          />
        </GestureHandlerRootView>
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
  },
});

export default WalletScreen;
