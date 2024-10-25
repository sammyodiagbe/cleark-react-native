import useSignupHook from "@/hooks/useSignupHook";
import { useUser } from "@clerk/clerk-expo";
import { Text, View, TextInput, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const { user } = useUser();

  console.log(user);
  const { email, password, setEmail, setPassword, createUserAccount } =
    useSignupHook();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 700 }}>
          Sign up
        </Text>
        <View style={{ gap: 8 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(password) => {
              setPassword(password);
            }}
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
            onPress={() => createUserAccount()}
          >
            <Text style={{ color: "white" }}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
