import React from "react";

import { RenderDataEntrenceModal, RenderItems } from "../util/constants";
import ChatBubble from "../components/ChatBubble";
import SoonBubble from "../components/SoonBubble";
import { View } from "react-native";
import InputData from "../components/InputData";
import InputDate from "../components/InputDate";
import InputFile from "../components/InputFile";
import InputFileUpload from "../components/InputFileUpload";
import InputImageFile from "../components/InputImageFile";
import FinishButton from "../components/FinishButton";

function ComponentsFactory(type: any, infoToBeAdded: string) {
  switch (type) {
    case RenderItems.CHAT_BUBBLE:
      return <ChatBubble dataToBeAdded={infoToBeAdded} />;
    case RenderItems.SOON_BUBBLE:
      return <SoonBubble />;
    case RenderDataEntrenceModal.TEXT_DATA:
      return <InputData dataToBeAdded={infoToBeAdded} />;
    case RenderDataEntrenceModal.DATE_DATA:
      return <InputDate dataToBeAdded={infoToBeAdded} />;
    case RenderDataEntrenceModal.FILE_DATA:
      return <InputFile dataToBeAdded={infoToBeAdded} />;
    case RenderDataEntrenceModal.UPLOAD_FILE_DATA:
      return <InputImageFile dataToBeAdded={infoToBeAdded} />;
    case RenderDataEntrenceModal.FINISH_BUTTON:
      return <FinishButton />;
    default:
      return <View />;
  }
}

export { ComponentsFactory };
