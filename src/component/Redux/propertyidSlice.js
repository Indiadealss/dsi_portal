import { createSlice } from '@reduxjs/toolkit';

const propertyidSlice = createSlice({
  name: 'propertyid',
  initialState: {
    data: null,
  },
  reducers: {
    setProperty: (state, action) => {
      state.data = action.payload;
    },
    clearProperty: (state) => {
      state.data = null;
    },
  },
});

export const { setProperty, clearProperty } = propertyidSlice.actions;
export default propertyidSlice.reducer;
