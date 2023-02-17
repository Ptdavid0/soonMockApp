import { Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useImperativeHandle, useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ChatBotContext from "../context/chatBotProvider";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const { state, setCurrentModalSize } = React.useContext(ChatBotContext);
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const BottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [0, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const topHeight = useMemo(() => {
      if (state && state.dataId) {
        switch (state.dataId) {
          case 1:
            setCurrentModalSize(SCREEN_HEIGHT - 10);
            return {
              top: SCREEN_HEIGHT - 15,
            };
          case 2:
            setCurrentModalSize(SCREEN_HEIGHT - 20);
            return {
              top: SCREEN_HEIGHT - 20,
            };
          case 3:
            setCurrentModalSize(SCREEN_HEIGHT - 100);
            return {
              top: SCREEN_HEIGHT - 80,
            };
          case 4:
            setCurrentModalSize(SCREEN_HEIGHT - 50);

            return {
              top: SCREEN_HEIGHT - 130,
            };
          case 5:
            setCurrentModalSize(SCREEN_HEIGHT - 170);
            return {
              top: SCREEN_HEIGHT - 20,
            };
          default:
            break;
        }
      }
    }, [state]);

    return (
      <Animated.View
        style={[styles.bottomSheetContainer, BottomSheetStyle, topHeight]}
      >
        {children}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT - 20,
    borderRadius: 25,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default BottomSheet;
