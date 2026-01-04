import { createSlice } from "@reduxjs/toolkit";


const titleSlice = createSlice({
    name:'title',
    initialState:{currentTitle:'Residential, Commercial Property in India - Buy Sell Properties Portal'},
    reducers:{
        setTitle:(state,action) => {
            state.currentTitle = action.payload;
        },
        clearTitle:(state) => {
            state.currentTitle = 'Residential, Commercial Property in India - Buy Sell Properties Portal';
        },
    },
});

export const  {setTitle,clearTitle} = titleSlice.actions;
export default titleSlice.reducer;