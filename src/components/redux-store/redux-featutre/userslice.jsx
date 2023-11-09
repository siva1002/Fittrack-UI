import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
};

const friendsslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    basicInfoChange: (state, action) => {
        state.friends = action.payload;
       
    },
},
});

export const { basicInfoChange } = friendsslice.actions;

export default friendsslice.reducer;