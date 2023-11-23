import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { basicInfoChange } from "../../redux-store/redux-featutre/userslice";
import Queries from "../utils/graphqueries";
import { TopNavBar } from "../../layouts/navlayout";

function Followers() {
  const friends = useSelector((state) => state.friends.friends);
  const { loading, error, data } = useQuery(Queries.friends,{variables:{type:"followers"}});
  const [UserProfile, setUserprofileview] = useState(false);
  const [UserWorkouts, setWorkouts] = useState([]);
  const dispatch = useDispatch();
  const ShowFriendProfile = (workouts) => {
    console.log(workouts);
    setUserprofileview(true);
    setWorkouts(workouts);
  };
  if (data) {
    dispatch(basicInfoChange(data.friends));
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
  return (
    <>
      <TopNavBar />
      {!UserProfile &&
        friends.map((f, i) => (
          <div key={i} className="relatedusers">
            <h1>{f.user.username}</h1>
            <button onClick={() => ShowFriendProfile(f.user.workouts)}>
              View
            </button>
          </div>
        ))}
      {UserProfile &&
        UserWorkouts.map((w, i) => (
          <div key={i} className="relatedusers">
            <h1>{w.name}</h1>
            {w.exercise.map((e)=>(
              <div>
              <details key={e.id}>
              <summary>{e.exercise}</summary>
              <p>sets: {e.sets}</p>
              {console.log(e)}
              <p>reps: {e.reps}</p>
              <p>duration: {e.duration}sec</p>
              </details>
              </div>
            ))} 
           
           
          </div>
        ))}
    </>
  );
}
export default Followers;
