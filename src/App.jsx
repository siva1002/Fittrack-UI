import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/app/home";
import Friends from "./components/app/friends/showFriends";
import Workouts from "./components/app/workouts/workout";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


function App() {
 return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/friends" element={<Friends />}/>
        <Route path="/workouts" element={<Workouts />}/>

      </Routes>
  </BrowserRouter>
}
if (true) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default App;
