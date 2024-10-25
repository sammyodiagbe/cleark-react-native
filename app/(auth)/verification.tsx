import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";

const VerificationScreen = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { email } = useLocalSearchParams();

  const verifyUserEmail = async () => {
    if (!signUp || !isLoaded) return;
    try {
      const verify = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      console.log(JSON.stringify(verify, null, 2));
      if (verify.status === "complete") {
        await setActive({ session: verify.createdSessionId });
        router.replace("/(home)");
      } else if (verify.status === "missing_requirements") {
        console.log("Missing requirements");
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 700 }}>Verify Account</Text>
        <Text>Enter Verification code sent to {email}</Text>
      </View>
      <View style={{ marginTop: 20, gap: 20 }}>
        <TextInput
          value={verificationCode}
          placeholder="Verification code"
          onChangeText={(value) => setVerificationCode(value)}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />
        <Pressable
          style={{
            backgroundColor: "slateblue",
            padding: 20,
            alignItems: "center",
            borderRadius: 8,
          }}
          onPress={() => verifyUserEmail()}
        >
          <Text style={{ color: "white" }}>Verify Account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;
