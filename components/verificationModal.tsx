import WebView from "react-native-webview";
import { Modal, View, TouchableOpacity, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface VerificationModalProps {
  visible: boolean;
  setOpenVerificationModal: (value: boolean) => void;
  accountLinkURL: string;
}

const VerificationModal = ({
  visible,
  setOpenVerificationModal,
  accountLinkURL,
}: VerificationModalProps) => {
  if (!accountLinkURL) return null;
  return (
    <SafeAreaView>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View
          style={{
            height: 50,
            backgroundColor: "transparent",
          }}
        ></View>
        <View style={{ padding: 20, backgroundColor: "white" }}>
          <TouchableOpacity onPress={() => setOpenVerificationModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <WebView source={{ uri: accountLinkURL }} style={{ flex: 1 }} />
      </Modal>
    </SafeAreaView>
  );
};

export default VerificationModal;
