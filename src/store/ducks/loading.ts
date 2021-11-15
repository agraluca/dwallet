import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingProps = {
  loading: boolean;
};

const initialState: LoadingProps = {
  loading: false,
};

type LoadingPayloadProps = {
  name: unknown;
  value: boolean;
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingStatus: (state, action: PayloadAction<LoadingPayloadProps>) => {
      action.payload.name = action.payload.value;
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const loadingActions = loadingSlice.actions;
