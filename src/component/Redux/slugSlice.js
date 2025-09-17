import { createSlice, current } from "@reduxjs/toolkit";


const slugSlice = createSlice({
    name:'slug',
    initialState:{currentSlug:null},
    reducers:{
        setSlug:(state,action) => {
            state.currentSlug = action.payload;
        },
        clearSlug:(state) => {
            state.currentSlug = null;
        },
    },
});

export const {setSlug,clearSlug} = slugSlice.actions;
export default slugSlice.reducer;