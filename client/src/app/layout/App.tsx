import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  const location = useLocation();
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </Switch>
  );
}

export default observer(App);
