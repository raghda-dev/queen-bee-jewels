import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ChatMessage = {
  id: string;
  subject: string;
  body: string;
  sender: string;
  avatar?: string; // ✅ Add this line
};

type ChatState = {
  messages: ChatMessage[];
};

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<ChatMessage, 'id'>>) => {
      const newMessage = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.messages.unshift(newMessage);
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const { addMessage, deleteMessage } = chatSlice.actions;
export const selectMessages = (state: { chat: ChatState }) =>
  state.chat.messages;
export default chatSlice.reducer;
