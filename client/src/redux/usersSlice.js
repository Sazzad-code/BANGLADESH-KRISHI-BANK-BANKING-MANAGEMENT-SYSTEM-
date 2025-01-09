import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: { // Corrected property name
        user: null,
    },
    reducers: {
        setUser(state, action) { // Renamed to lowercase for consistency
            state.user = action.payload;
        },
    },
});

export const { setUser } = usersSlice.actions; // Updated action name export
export default usersSlice.reducer;
