import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import Workouts from "../workouts/workout";
import { useMutation } from "@apollo/client";
import Mutations from "../utils/graphmutations";

function StartWorkoutComponent({ props }) {
  const data = props.routines;
  console.log(parseInt(data));
  const workout = parseInt(data[0].workout.id);
  const [CurrentExcercise, setExcercise] = useState({});
  const [IsStarted, setStart] = useState(false);
  const [CreateTracking] = useMutation(Mutations.tracking);
  const [UpdateTracking] = useMutation(Mutations.updatetracking);

  const updateTrackings = () => {
    UpdateTracking({ variables: { workout } }).then((response) => {
      console.log("TrackingsUpdate:", response);
      setStart(false);
      return response;
    });
  };
  const Pause = () => {
    data.forEach
  };
  const Begin = async () => {
    if (data.length > 0) {
      CreateTracking({
        variables: { IsStarted: true, workout },
      })
        .then((response) => {
          return response.data;
        })
        .then((resdata) => {
      if (resdata.trackingsCreate.status) {
      setStart((e) => !e);
      let timing = 0;
      let totalduration = data.reduce((a, b) => {
        return a + b.duration;
      }, 0);
      data.forEach((item, index) => {
        setTimeout(() => setExcercise(item),parseInt(data.length) > 1 ? timing * 1000 : setExcercise(item));
        timing += parseInt(item.duration);
      });
      setTimeout(() => updateTrackings(), parseInt(totalduration + 2) * 1000);
    }
    });
  };
  };
  return (
    <>
      {data?.length && (
        <div>
          <div className="startworkoutdiv">
            <h1 style={{ textAlign: "center" }}>{data[0].workout.name}</h1>
            {data?.map((e, index) => {
              return (
                <details key={e.id}>
                  <summary>{e.exercise}</summary>
                  <p>sets: {e.sets}</p>
                  <p>reps: {e.reps}</p>
                  <p>duration: {e.duration}sec</p>
                </details>
              );
            })}
          </div>
          <button
            onClick={() => Begin()}
            style={{ float: "left" }}
          >
            {console.log(IsStarted)}
            {IsStarted ? "STOP" : "Start"}
          </button>
        </div>
      )}
      {IsStarted && (
        <div>
          {IsStarted && <>Current Excercise:{CurrentExcercise.exercise}</>}
        </div>
      )}
      {!data?.length && <Workouts props={{ id: id }} />}
    </>
  );
}
export default StartWorkoutComponent;
