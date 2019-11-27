import React, { Fragment } from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface IProps {
  activity: IActivity;
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Description>Hosted By Said Alsharqawi</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Icon name='clock' /> {activity.date}
          <Icon name='marker' /> {activity.venue}, {activity.city}
        </Segment>
        <Segment secondary>Attendees will go here</Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated='right'
            content='View'
            color='blue'
          />
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default observer(ActivityListItem);
