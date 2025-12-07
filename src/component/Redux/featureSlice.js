import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sobufeature:[]
}

const featureSlice = createSlice({
    name: "feature",
    initialState,
    reducers: {
        updateFeatures: (state, action) => {
            state.sobufeature = action.payload;
        },
        clearFeatures: () => initialState,
    },
});

export const {updateFeatures,clearFeatures} = featureSlice.actions;
export default featureSlice.reducer;