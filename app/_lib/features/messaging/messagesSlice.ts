import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
  currentUserId: string | null;
  wantedUserId: string | null;
  wantedUserFirstName: string | null;
  wantedUserLastName: string | null;
}

const initialState: MessagesState = {
  currentUserId: null,
  wantedUserId: null,
  wantedUserFirstName: null,
  wantedUserLastName: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCurrentUserId(state, action: PayloadAction<string>) {
      state.currentUserId = action.payload;
    },
    setWantedUserId(state, action: PayloadAction<string>) {
      state.wantedUserId = action.payload;
    },
    setWantedUserFirstName(state, action: PayloadAction<string>) {
      state.wantedUserFirstName = action.payload;
    },
    setWantedUserLastName(state, action: PayloadAction<string>) {
      state.wantedUserLastName = action.payload;
    },
  },
});

export const {
  setCurrentUserId,
  setWantedUserId,
  setWantedUserFirstName,
  setWantedUserLastName,
} = messagesSlice.actions;
export default messagesSlice.reducer;
