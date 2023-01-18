import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  userID: '',
  userHouse: [],
  formData: {},
  chats: [],
  currentChatBox:"",
  isAuthenticated: false
};


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        userID: action.payload
      }
    },
    setUserLogout: (state, action) => {
      state.isAuthenticated = false
    },
    //TODO: CHANGE THE NAME, IT IS CONFUSING
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    setUserHouse: (state, action) => {
      state.userHouse = action.payload
    },
    setUserChats: (state, action) => {
      state.chats = action.payload
    },
    setUserId: (state, action) => {
      state.userID = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChatBox = action.payload;
    },
  },
});

export const { setUserLogin, setUserLogout, setUserHouse, handleChange, setUserChats, setUserId,setCurrentChat } = userSlice.actions;
export default userSlice.reducer;

