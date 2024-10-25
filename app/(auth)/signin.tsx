import useSignInHook from "@/hooks/useSigninHook";
import { router } from "expo-router";
import { Text, Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    attemptSignIn,
    attemptingSignin,
  } = useSignInHook();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 700 }}>Welcome Back</Text>
        <Text>Sign in into your account</Text>
      </View>
      <View style={{ marginTop: 20, gap: 20 }}>
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
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
          onPress={() => attemptSignIn()}
        >
          <Text style={{ color: "white" }}>
            {attemptingSignin ? "Signing in" : "Sign in"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push("/(auth)/signup");
          }}
        >
          <Text>Don't have an account, create one now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
