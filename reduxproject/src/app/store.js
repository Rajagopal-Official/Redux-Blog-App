import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../feautures/posts/postsSlice'
import userReducer from '../feautures/users/usersSlice'
export const store=configureStore({
    reducer:{
        posts:postsReducer,
        users:userReducer,
    }
})