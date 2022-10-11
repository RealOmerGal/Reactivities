import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - could not found what you have been looking for.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to activities
        </Button>
      </Segment.Inline>
    </Segment>
  );
}

export default NotFound;
