import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkoutInfo } from "../../redux-store/redux-featutre/workoutslice";
import { useMutation, useQuery } from "@apollo/client";
import Queries from "../utils/graphqueries";
import AddWorkout from "./createworkout";
import StartWorkoutComponent from "./startworkout";
import ShowExerciseComponent from "../excercise/showexercise";
import { TopNavBar } from "../../layouts/navlayout";
import Mutations from "../utils/graphmutations";
import { useNavigate } from "react-router-dom";

let navigate=useNavigate

function Workouts() {
  const workouts = useSelector((state) => state.workout.workout);
  const { loading, error, data } = useQuery(Queries.workout);
  const [ishown, IsShown] = useState(true);
  const [IsStarted, setStarted] = useState(false);
  const [addWorkout, setAddWorkout] = useState(false);
  const [Activityupdate]=useMutation(Mutations.updatetracking)

  const [routines, setWorkout] = useState([]);
  const dispatch = useDispatch();

  if (data) {
    dispatch(WorkoutInfo(data.workout));
  }

  const Startworkout = (routines) => {
    console.log(routines,"current routine")
    setStarted((e) => !e);
    IsShown((e) => !e);
    setWorkout(routines);
  };

  const StopWorkout=(w)=>{
    Activityupdate({variables:{workout:parseInt(w.id)}}).then((res)=>{
      return res
    }).then((data)=>{
      console.log(data.data,"data")
      if (data.data.trackingsUpdate.status===200){
        window.location.reload()
      }
      setStarted(false);
    })
  }

  const ShowExercise = (routines) => {
    if (ishown) {
      IsShown(false);
      setWorkout(routines);
    } else {
      IsShown(true);
    }
    return;
  };

  const ChangeIsStarted = () => {
    setStarted((e) => !e);
    IsShown((e) => !e);
  };
  return (
    <>
      <TopNavBar />
      {ishown && (
        <div className="workoutdiv">
          <div>
            <button
              onClick={() => setAddWorkout((e) => !e)}
              style={{ float: "right", width: "max-content" }}
            >
              {addWorkout ? "Close" : "Add Workout"}
            </button>
            {addWorkout && <AddWorkout />}
          </div>
          <div className="workouts">
            {workouts.map((workout, i) => {
              return (
                <div key={i} className="each-workout">
                  <h1 style={{ textAlign: "center" }}>{workout.name}</h1>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ margin: 0 }}>
                      Duration:
                      {workout.totalduration ? workout.totalduration : 0}
                    </h1>
                    <h1>
                      Count:
                      <span>
                        <p>{workout.count ? workout.count : 0}</p>
                      </span>
                    </h1>
                  </div>

                  <div>
                    <button
                      disabled={workout.exercise.length <= 0 && workout.category != 'CARDIO' ? true : false}
                      style={{ marginRight: "2rem" }}
                      onClick={() => (!workout.started && !IsStarted) || (workout.started && workout.category != 'CARDIO' ) ?Startworkout(workout):StopWorkout(workout)}
                    >
                      {console.log(workout.started,workout.category != 'CARDIO',workout.name)}
                      {(!workout.started && !IsStarted) || (workout.started && workout.category != 'CARDIO' ) ? "Start":"Stop"}
                    </button>
                    {workout.category != 'CARDIO' && <button onClick={() => ShowExercise(workout)}>
                      Show routines
                    </button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!IsStarted && !ishown && (
        <div>
          <button
            onClick={() => IsShown(true)}
            style={{
              float: "left",
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
            }}
          >
            back
          </button>
          <ShowExerciseComponent props={{ routines: routines }} />
        </div>
      )}
      
      {(IsStarted) && (
        <div>
          <button onClick={() => ChangeIsStarted()}>close</button>
          {console.log(routines)}
          <StartWorkoutComponent props={{ routines: routines }} />
        </div>
      )}
        </>
  );
}
export default Workouts;
