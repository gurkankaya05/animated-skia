import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useCallback } from "react";
export default function App() {
  const { width, height } = useWindowDimensions();

  const lColor = useSharedValue("aqua");
  const rColor = useSharedValue("black");

  const colors = useDerivedValue(() => {
    return [lColor.value, rColor.value];
  }, []);

  const getColor = useCallback(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }, []);

  return (
    <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} />
        <LinearGradient
          start={vec(0, 0)}
          colors={colors}
          end={vec(width, height)}
        />
      </Canvas>

      <TouchableOpacity
        onPress={() => {
          lColor.value = withTiming(getColor());
          rColor.value = withTiming(getColor());
        }}
        style={styles.button}
      >
        <FontAwesome name="random" size={24} color={"white"} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 52,
    right: 32,
    height: 64,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: "#111",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
