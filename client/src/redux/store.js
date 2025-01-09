import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"; // Adjust the path as necessary

const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;
