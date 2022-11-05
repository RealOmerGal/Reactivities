import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useStore } from "../stores/store";

interface Props extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: Props) {
  const { userStore } = useStore();
  return (
    <Route
      {...rest}
      render={(props) =>
        userStore.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
