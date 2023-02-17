import {
  ChatBotStates,
  RenderDataEntrenceModal,
  RenderItems,
} from "../util/constants";

export const InitialChatBotState = {
  currentAction: ChatBotStates.STATE_ONE,
  renderItem: RenderItems.SOON_BUBBLE,
  showButton: false,
  showModal: false,
  modalItem: null,
  infoToBeAdded: null,
  addUserInfo: false,
  nextAction: ChatBotStates.STATE_TWO,
  dataId: null,
};

export const ChatBotReducer = (state: any, action: any) => {
  switch (action.type) {
    case ChatBotStates.STATE_ONE:
      return {
        currentAction: action.type,
        renderItem: RenderItems.SOON_BUBBLE,
        showButton: false,
        showModal: false,
        modalItem: null,
        infoToBeAdded: null,
        addUserInfo: false,
        nextAction: ChatBotStates.STATE_TWO,
        dataId: null,
      };
    case ChatBotStates.STATE_TWO:
      return {
        currentAction: action.type,
        renderItem: RenderItems.CHAT_BUBBLE,
        showButton: false,
        showModal: true,
        addUserInfo: true,
        infoToBeAdded: "name",
        modalItem: RenderDataEntrenceModal.TEXT_DATA,
        nextAction: ChatBotStates.STATE_THREE,
        dataId: 1,
      };
    case ChatBotStates.STATE_THREE:
      return {
        currentAction: action.type,
        renderItem: RenderItems.SOON_BUBBLE,
        showButton: false,
        showModal: false,
        modalItem: null,
        addUserInfo: false,
        infoToBeAdded: null,
        nextAction: ChatBotStates.STATE_FOUR,
        dataId: null,
      };
    case ChatBotStates.STATE_FOUR:
      return {
        currentAction: action.type,
        renderItem: RenderItems.CHAT_BUBBLE,
        showButton: false,
        showModal: true,
        addUserInfo: true,
        infoToBeAdded: "dateOfBirth",
        modalItem: RenderDataEntrenceModal.DATE_DATA,
        nextAction: ChatBotStates.STATE_FIVE,
        dataId: 2,
      };
    case ChatBotStates.STATE_FIVE:
      return {
        currentAction: action.type,
        renderItem: RenderItems.SOON_BUBBLE,
        showButton: false,
        showModal: false,
        modalItem: null,
        addUserInfo: false,
        infoToBeAdded: null,
        nextAction: ChatBotStates.STATE_SIX,
        dataId: null,
      };
    case ChatBotStates.STATE_SIX:
      return {
        currentAction: action.type,
        renderItem: RenderItems.CHAT_BUBBLE,
        showButton: false,
        showModal: true,
        addUserInfo: true,
        infoToBeAdded: "faceImage",
        modalItem: RenderDataEntrenceModal.FILE_DATA,
        nextAction: ChatBotStates.STATE_SEVEN,
        dataId: 3,
      };
    case ChatBotStates.STATE_SEVEN:
      return {
        currentAction: action.type,
        renderItem: RenderItems.SOON_BUBBLE,
        showButton: false,
        showModal: false,
        modalItem: null,
        addUserInfo: false,
        infoToBeAdded: null,
        nextAction: ChatBotStates.STATE_EIGHT,
        dataId: null,
      };
    case ChatBotStates.STATE_EIGHT:
      return {
        currentAction: action.type,
        renderItem: RenderItems.CHAT_BUBBLE,
        showButton: false,
        showModal: true,
        addUserInfo: true,
        infoToBeAdded: "carPhoneImage",
        modalItem: RenderDataEntrenceModal.UPLOAD_FILE_DATA,
        nextAction: ChatBotStates.STATE_NINE,
        dataId: 4,
      };
    case ChatBotStates.STATE_NINE:
      return {
        currentAction: action.type,
        renderItem: RenderItems.SOON_BUBBLE,
        showButton: false,
        showModal: true,
        addUserInfo: false,
        infoToBeAdded: null,
        modalItem: RenderDataEntrenceModal.FINISH_BUTTON,
        nextAction: null,
        dataId: 5,
      };
  }
};
