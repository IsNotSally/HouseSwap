import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  houses: [],
  status: 'idle',
  error: null,
  isLoading: true
};


const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setHouses: (state, action) => {
      state.houses = action.payload
    },
    addHouse: (state, action) => {
      state.houses.push(action.payload)
    }
  },
});

export const { setHouses,addHouse } = houseSlice.actions;
export default houseSlice.reducer;

