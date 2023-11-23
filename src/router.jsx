
import { useRoutes } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/app/home";
import Friends from "./components/app/friends/followers";
import Workouts from "./components/app/workouts/workout";

import { TopNavBar } from "./components/layouts/navlayout";
import FriendsRequests from "./components/app/friends/pendingFriendrequest";
export default function Router() {
    return useRoutes([
        {
          path: "/home",
          children: [
            { path: "friends", element: <Friends/> },
            { path: "workouts", element: <Workouts/> },
          ],
        },
        {
          path: "/",
          element: <Login />,
        },
      ]);
}