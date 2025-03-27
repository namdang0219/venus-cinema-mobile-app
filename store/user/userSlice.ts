import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
	},
	reducers: {
		updateUser(state, action) {
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
			};
		},
	},
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
