import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from"axios"
const USER_URL="https://jsonplaceholder.typicode.com/users"//USERSAPI
const initialState=[]
export const fetchUsers=createAsyncThunk('users/fetchUsers',async()=>{
    const response=await axios.get (USER_URL)
    return response.data
})
const usersSlice=createSlice({//this is  the actions that happens at the client end
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){//this is actions on the middleware which we want to perform while launching of the apps
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
        return action.payload;//While coming to users or names u can directly return the action.payload without the immer package to avoid doubling,here the element is completely replaced
        })
    }
})
export const SelectAllUsers=(state)=>state.users
export const selectUserById=(state,userId)=>state.users.find((user)=>user.id===userId)
export default usersSlice.reducer