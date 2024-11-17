import { Camera } from "expo-camera";
import {
  IdentityVerificationSheetOptions,
  useStripeIdentity,
} from "@stripe/stripe-identity-react-native";

const UseVerificationHook = () => {
  const startVerificationSession = async () => {
    try {
      const data = await fetch(
        "http://192.168.43.23:8000/stripe/connect/creatq-verfication-seesion"
      );
      const sessionData = await data.json();

      return sessionData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOptions = async () => {
    const sessionData = await startVerificationSession();
    return {
      sessionId: sessionData?.sessionId,
      ephemeralKeySecret: sessionData?.ephemeralKey,
    } as IdentityVerificationSheetOptions;
  };

  return {
    fetchOptions,
  };
};

export default UseVerificationHook;
