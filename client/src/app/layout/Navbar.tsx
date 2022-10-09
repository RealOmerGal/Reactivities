import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

function Navbar() {
  const { openForm } = useStore().activityStore;
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "8px" }}
          />
          Reactivites
        </Menu.Item>
        <Menu.Item name="Activites" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => openForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
