import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

function Navbar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "8px" }}
          />
          Reactivites
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activites" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createActivity"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profiles/${user?.username}`}
                text="My Profile"
                icon="user"
              />
              <Dropdown.Item
                onClick={logout}
                text="Log out"
                icon="power"
              ></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default observer(Navbar);
