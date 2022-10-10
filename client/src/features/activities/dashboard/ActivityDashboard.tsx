import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial)
    return <Loading content="Loading Activities..." />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
