import { createSlice } from '@reduxjs/toolkit';


const initialState = {
 formData: {},
 messages: [],
 isAuthenticated: false
};


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.isAuthenticated = true;
    },
    setUserLogout: (state, action) => {
      state.isAuthenticated = false;
    },
    //TODO: CHANGE THE NAME, IT IS CONFUSING
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    displayAllMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setUserLogin,setUserLogout,handleChange, displayAllMessages } = userSlice.actions;
export default userSlice.reducer;

