import type { Role, StoreSlice } from '../types';

export type EChat = {
  chatId: string;
  content: string;
  role: Role;
};

export interface IResponseSlice {
  chats: EChat[];

  addChat: (response: EChat) => void;
  removeChat: (responseId: string) => void;

  addContent: (responseId: string, content: string) => void;
}

const createResponseSlice: StoreSlice<IResponseSlice> = (set) => ({
  chats: [],

  addChat: (newChat: EChat) => {
    set((state) => {
      return { chats: [...state.chats, newChat] };
    });
  },

  removeChat: (chatId) => {
    set((state) => {
      return {
        chats: state.chats.filter((chat) => chat.chatId !== chatId),
      };
    });
  },

  addContent: (chatId, content) => {
    set((state) => {
      return {
        chats: state.chats.map((response) => {
          if (response.chatId === chatId) {
            const new_content = response.content + content;
            return { ...response, content: new_content };
          }

          return response;
        }),
      };
    });
  },
});

export default createResponseSlice;
