import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { basicInfoChange } from "../redux-store/redux-featutre/userslice";
import { WorkoutInfo } from "../redux-store/redux-featutre/workoutslice";
import Queries from "./utils/graphqueries";
import { useNavigate } from "react-router-dom";

import "../../assets/css/home.css";

function Friends() {
  const navigate = useNavigate();

  const friends = useSelector((state) => state.friends.friends);
  const handleClick = () => {
    navigate("/friends");
  };

  return (
    <div>
      <h1 onClick={handleClick}>Friends:{friends.length}</h1>
    </div>
  );
}

function Workout() {
  const navigate = useNavigate();
  const workouts = useSelector((state) => state.workout.workout);
  const handleClick = () => {
    navigate("/workouts");
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 onClick={handleClick}>Workout:{workouts.length}</h1>
      </div>
    </div>
  );
}

function Home() {
  const { loading, error, data } = useQuery(Queries.dashboard);
  const dispatch = useDispatch();

  if (data) {
    console.log(data.workout, data.friends);
    dispatch(basicInfoChange(data.friends));
    dispatch(WorkoutInfo(data.workout));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div className="topdash">
      {<Friends />}
      {<Workout />}
    </div>
  );
}
export default Home;
