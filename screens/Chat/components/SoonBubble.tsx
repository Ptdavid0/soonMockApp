import React, { useEffect, useRef, memo } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import ChatBotContext from "../context/chatBotProvider";

interface UserBubbleProps {
  data?: any;
}

const SoonBubble = ({ data = "Sandwich" }: UserBubbleProps) => {
  const positionAnimated = useRef(new Animated.Value(10)).current;
  const opacityAnimated = useRef(new Animated.Value(0)).current;
  const { userInfo } = React.useContext(ChatBotContext);

  const Opening = Animated.parallel([
    Animated.timing(opacityAnimated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(positionAnimated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]);

  useEffect(() => {
    Opening.start();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.bubble,
        opacity: opacityAnimated,
        transform: [{ translateX: positionAnimated }],
      }}
    >
      {data.specialInfo ? (
        <Text style={styles.textBubble}>
          {`${data.text} ${
            userInfo[data.specialInfo as keyof typeof userInfo]
          }`}
        </Text>
      ) : (
        <Text style={styles.textBubble}>{data.text}</Text>
      )}
    </Animated.View>
  );
};

export default memo(SoonBubble);

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  bubble: {
    backgroundColor: "#6e43fe",
    padding: 16,
    marginRight: "20%",
    marginVertical: 8,
    marginLeft: 10,
    maxWidth: "75%",
    alignSelf: "flex-start",
    borderRadius: 20,
    borderTopLeftRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,

    elevation: 5,
  },
  textBubble: {
    fontSize: 16,
    color: "white",
  },
});
