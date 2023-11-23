import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/app/home";
import Friends from "./components/app/friends/followers";
import Workouts from "./components/app/workouts/workout";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { TopNavBar } from "./components/layouts/navlayout";
import FriendsRequests from "./components/app/friends/pendingFriendrequest";
import Following from "./components/app/friends/followings";
import Followers from "./components/app/friends/followers";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/followings" element={<Following />} />

          <Route path="/workouts" element={<Workouts />} />
          <Route path="/pendingrequests" element={<FriendsRequests />} />
          <Route path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}
if (true) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default App;
