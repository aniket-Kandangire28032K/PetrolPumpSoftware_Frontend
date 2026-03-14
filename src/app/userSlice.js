import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        name:null,
        role:null,
        isloggedIn:false
    },
    reducers:{
        login: (state,action) =>{
       state.user = action.payload.name,
       state.role = action.payload.role,
       state.isloggedIn = true
        },
        logout : state =>{
           state.user = null,
       state.role = null,
       state.isloggedIn = false
        }
    }
})
export const {login,logout} = userSlice.actions

export default userSlice.reducer