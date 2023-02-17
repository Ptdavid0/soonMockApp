import React, { useState, useEffect, Fragment } from "react";
import { Animated, View, StyleSheet } from "react-native";

interface ChatTypingProps {
  delay: any;
  children: any;
}

const AnimatedWrapper = ({ delay, children }: ChatTypingProps) => {
  const [timing] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.timing(timing, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        })
      ),
    ]);
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = timing.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 1, 0.2],
  });

  return (
    <Animated.View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 18,
        opacity,
      }}
    >
      {children}
    </Animated.View>
  );
};

const Dot = ({ color = "black", size = 8 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: (size || 0) / 2,
      backgroundColor: color,
    }}
  />
);

function ChatTyping() {
  const delayValues = [0, 300, 600];
  return (
    <Fragment>
      <View style={styles.bubble}>
        <View style={{ flexDirection: "row" }}>
          {delayValues.map((delay) => (
            <AnimatedWrapper key={delay} {...{ delay }}>
              <Dot />
            </AnimatedWrapper>
          ))}
        </View>
      </View>
    </Fragment>
  );
}

export default ChatTyping;

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "ghostwhite",
    padding: 16,
    paddingTop: 22,
    paddingBottom: 22,
    marginLeft: "45%",
    marginTop: 5,
    marginRight: 10,
    maxWidth: "75%",
    alignSelf: "flex-end",
    borderRadius: 20,
    borderTopRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,

    elevation: 5,
  },
});
