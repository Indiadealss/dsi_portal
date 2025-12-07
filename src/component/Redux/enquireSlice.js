import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    name: '',
    mobile:'',
    email:'',
    address:''
}

const enquireSlice = createSlice({
    name: 'enquire',
    initialState,
    reducers: {
        updateenquireForm: (state,action) =>{
            return { ...state, ...action.payload};
        },
        clearEnquire: () => initialState,
    },
});

export const {updateenquireForm, clearEnquire} = enquireSlice.actions;
export default enquireSlice.reducer