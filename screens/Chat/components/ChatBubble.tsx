import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Animated, StyleSheet, Text, Image } from "react-native";
import ChatTyping from "../components/ChatTyping";
import ChatBotContext from "../context/chatBotProvider";

interface ChatBubbleProps {
  data?: any;
  isTyping?: boolean;
  dataToBeAdded: string;
  bubbleState?: any;
}

function ChatBubble({ data, isTyping = true, dataToBeAdded }: ChatBubbleProps) {
  const positionAnimated = useRef(new Animated.Value(-10)).current;
  const opacityAnimated = useRef(new Animated.Value(0)).current;
  const typingOpacityAnimated = useRef(new Animated.Value(0)).current;
  const { userIsTyping, userInfo, state } = React.useContext(ChatBotContext);

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

  const FadeIn = Animated.timing(typingOpacityAnimated, {
    toValue: 1,
    duration: 800,
    useNativeDriver: true,
  });

  const FadeOut = Animated.timing(typingOpacityAnimated, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (!isTyping) {
      Opening.start();
    } else {
      FadeIn.start(() => {
        if (!userIsTyping) {
          Opening.start();
        }
      });
    }
  }, [userIsTyping, userInfo, state]);

  const text = useMemo(() => {
    if (userInfo && dataToBeAdded) {
      return userInfo[dataToBeAdded as keyof typeof userInfo];
    }
    return data.text;
  }, [userInfo, state]);

  return (
    <View>
      {userIsTyping && !userInfo[dataToBeAdded as keyof typeof userInfo] ? (
        <Animated.View style={{ opacity: typingOpacityAnimated }}>
          <ChatTyping />
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            ...styles.bubble,
            opacity: opacityAnimated,
            transform: [{ translateX: positionAnimated }],
          }}
        >
          {text && text.includes("file:") ? (
            <Image
              source={{ uri: text }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
              }}
            />
          ) : (
            <Text style={styles.textBubble}>{text}</Text>
          )}
        </Animated.View>
      )}
    </View>
  );
}

export default ChatBubble;

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "ghostwhite",
    padding: 16,
    marginLeft: "20%",
    marginVertical: 8,
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
  textBubble: {
    fontSize: 16,
    color: "black",
  },
});
