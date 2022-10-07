import axios from "axios";
import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Header, List } from "semantic-ui-react";
function App() {
  const [activities, setActivites] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      setActivites((prev) => res.data);
      console.log(activities);
    });
  }, []);

  return (
    <>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </>
  );
}

export default App;
