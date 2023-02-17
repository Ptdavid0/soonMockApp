import React, {
  useMemo,
  useEffect,
  useState,
  cloneElement,
  memo,
  Fragment,
} from "react";
import ChatBotContext from "../context/chatBotProvider";

interface BubbleFactoryProps {
  data?: any;
  bubble?: any;
  interval?: number;
  callback?: any;
  addUserInfo: boolean;
  infoToBeAdded?: string;
}

const BubblesFactory = ({
  data,
  bubble,
  interval = 1000,
  callback,
}: BubbleFactoryProps) => {
  const [bubbles, setBubbles] = useState<any>([]);
  const [index, setIndex] = useState<number | null>(null);
  const componentsLength = useMemo(() => {
    return data?.length;
  }, [data]);
  const { userIsTyping } = React.useContext(ChatBotContext);

  useEffect(() => {
    let count = 0;

    setIndex(count);
    count++;

    const timer = setInterval(() => {
      if (count === componentsLength) {
        stopBubbles();
        clearInterval(timer);
      } else {
        setIndex(count);
        count++;
      }
    }, interval);
  }, []);

  useEffect(() => {
    if (index !== null) {
      setBubbles([...bubbles, data[index]]);
    }
  }, [index]);

  const stopBubbles = () => {
    if (!userIsTyping) {
      callback && callback();
    }
  };

  useEffect(() => {
    if (!userIsTyping && index === componentsLength - 1 && bubbles.length) {
      callback && callback();
    }
  }, [userIsTyping]);

  return (
    <Fragment>
      {bubbles.map((component: any, index: number) => {
        return cloneElement(bubble, {
          key: index,
          data: component,
        });
      })}
    </Fragment>
  );
};

export default memo(BubblesFactory);
