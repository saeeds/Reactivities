import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface Iprops {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<Iprops> = ({
  activity,
  setEditMode,
  setSelectedActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            basic
            color='grey'
            content='Cancel'
            onClick={() => setSelectedActivity(null)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
