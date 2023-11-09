import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mutations from "../utils/graphmutations";

import { useMutation, gql } from "@apollo/client";
import Workouts from "../workouts/workout";
import ShowExerciseComponent from "./showexercise";

function CreateExercise(props) {
  const [name, setName] = useState("");
  const [reps, setRep] = useState(0);
  const [sets, setcount] = useState(0);
  const [ishown, changeshown] = useState(true);
  let workout = parseInt(props.props.id);
  const [CreateExercise] = useMutation(Mutations.excercise);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleRepchange = (event) => {
    setRep(parseInt(event.target.value));
  };
  const handleSets = (event) => {
    setcount(parseInt(event.target.value));
  };

  const handleSubmit = () => {
    if (name && sets && reps)
      CreateExercise({
        variables: { name, sets, reps, workout },
      })
        .then((response) => {
          console.log("Workout created:", response);
          return response;
          // Handle success, e.g., show a success message
        })
        .then((data) => {
          console.log(data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          // Handle error, e.g., show an error message
        });
    return true;
  };

  return (
    <>
        <div className="createexercise" style={{"width": "fit-content","margin-left": "40%"}}>
          <h1></h1>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Reps:
            <br />
            <input value={reps} type="number" onChange={handleRepchange} />
          </label>
          <label>
            sets:
            <br />
            <input value={sets} type="number" onChange={handleSets} />
          </label>
          <button onClick={handleSubmit}>Create</button>
        </div>
    </>
  );
}
export default CreateExercise;
