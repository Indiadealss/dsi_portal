import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  mobile: "",
  company_name: "",
  company_url: "",
  company_profile: "",
  address: "",
  landline: "",
  you_are: "",
  logo: "",
  profile_photo: "",
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const data = action.payload || {};

      state.id = data.id || "";
      state.name = data.name || "";
      state.email = data.email || "";
      state.mobile = data.mobile || "";
      state.company_name = data.company_name || "";
      state.company_url = data.company_url || "";
      state.company_profile = data.company_profile || "";
      state.address = data.address || "";
      state.landline = data.landline || "";
      state.you_are = data.you_are || "";
      state.logo = data.logo || "";
      state.profile_photo = data.profile_photo || "";
      state.loggedIn = true;
    },

    clearUser: (state) => {
      Object.keys(state).forEach((key) => {
        if (key === "loggedIn") {
          state[key] = false;
        } else {
          state[key] = "";
        }
      });
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;