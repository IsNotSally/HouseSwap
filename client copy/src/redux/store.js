import { configureStore } from '@reduxjs/toolkit'
import houseReducer from './houseSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    houses: houseReducer,
    users: userReducer
  }
})
