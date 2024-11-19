import { Image } from "react-native";

interface ImageCaptureComponentProps {
  image: string;
}

const ImageCaptureComponent = ({ image }: ImageCaptureComponentProps) => {
  return <Image source={{ uri: image }} style={{ height: 250 }} />;
};

export default ImageCaptureComponent;
