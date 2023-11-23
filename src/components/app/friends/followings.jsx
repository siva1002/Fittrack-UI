import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { basicInfoChange } from "../../redux-store/redux-featutre/userslice";
import Queries from "../utils/graphqueries";
import Mutations from "../utils/graphmutations";
import { TopNavBar } from "../../layouts/navlayout";

function Following() {
  const friends = useSelector((state) => state.friends.friends);
  const { loading, error, data } = useQuery(Queries.friends, {
    variables: { type: "following" },
  });
  const [RemoveFollower] = useMutation(Mutations.unfollow);
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

  const funcUnfollow = (id) => {
    console.log(id);
    RemoveFollower({
      variables: { id },
    }).then((response) => {
      console.log(response);
      return response;
    });
  };
  return (
    <>
      <TopNavBar />
      {!UserProfile &&
        friends.map((f, i) => (
          <div key={i} className="relatedusers">
            {console.log(f)}
            <h1>{f.userfriend.username}</h1>
              <button onClick={() => ShowFriendProfile(f.userfriend.workouts)}>
                View
              </button>
              <button onClick={() => funcUnfollow(f.userfriend.id)} style={{marginLeft:"1%"}}>
                Unfollow
              </button>
            </div>
        ))}
      {UserProfile &&
        UserWorkouts.map((w, i) => (
          <div key={i} className="relatedusers">
            <h1>{w.name}</h1>
            {w.exercise.map((e) => (
              <details key={e.id}>
                <summary>{e.exercise}</summary>
                <p>sets: {e.sets}</p>
                <p>reps: {e.reps}</p>
                <p>duration: {e.duration}sec</p>
              </details>
            ))}
          </div>
        ))}
    </>
  );
}
export default Following;
