import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingProps = {
  loading: {
    [name: string]: boolean;
  };
};

const initialState: LoadingProps = {
  loading: {},
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state.loading = {
        ...state.loading,
        [action.payload]: true,
      };
    },
    finishLoading: (state, action: PayloadAction<string>) => {
      state.loading = {
        ...state.loading,
        [action.payload]: false,
      };
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const loadingActions = loadingSlice.actions;
