// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/Spots/SpotDetail";
import CreateSpot from "./components/Spots/CreateSpot";
import UpdateSpot from "./components/Spots/UpdateSpot";
import ManageSpots from "./components/Spots/ManageSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route path='/spots/current'>
            <ManageSpots user={user} />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetail user={user} />
          </Route>
        </Switch>
      )}
      {/* <LandingPage /> */}
    </>
  );
}

export default App;