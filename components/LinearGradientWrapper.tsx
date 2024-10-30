import { LinearGradient } from "expo-linear-gradient";

const LinearGradientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#650ED8", "#9148F2", "#843FDF"]}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientWrapper;
