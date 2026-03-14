import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice.js";
export default configureStore({
    reducer:{
        user:UserReducer
    }
})