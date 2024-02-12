import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addAll: (state, action) => {
      const payloadData = action.payload;
      const isDuplicate = state.some((order) => order.id === payloadData.id);
      if (!isDuplicate) {
        state.push(payloadData);
      }

      return state;
    },
  },
});
export const { addAll } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
