import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workout: [],
};

const workoutslice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    WorkoutInfo: (state, action) => {
        state.workout= action.payload;
    },
},
});

export const { WorkoutInfo } = workoutslice.actions;

export default workoutslice.reducer;