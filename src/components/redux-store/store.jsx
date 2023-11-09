import { configureStore } from "@reduxjs/toolkit";
import friendsslice from "./redux-featutre/userslice";
import workoutslice from "./redux-featutre/workoutslice";

export const store = configureStore({
  reducer: {
    friends: friendsslice,
    workout: workoutslice,
  },
});
