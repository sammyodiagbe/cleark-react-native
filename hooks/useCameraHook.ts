import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
const UseCameraHook = () => {
  const [permission, requestPermission] = useCameraPermissions();

  return { permission, requestPermission };
};

export default UseCameraHook;
