import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    name:"",
    email:"",
    mobile:"",
    loggedIn:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{      // functions to modify state
        setUser: (state,action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
            state.loggedIn = true;
        },
        clearUser:(state) => {
            state.id = ""
            state.name = "",
            state.email = "",
            state.mobile = "",
            state.loggedIn = false
        }
    }
});

export const { setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;