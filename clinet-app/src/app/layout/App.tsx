import React, { useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../strores/activityStore';

const App: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.lodingInitial)
    return <LoadingComponent content='Loading activities' />;
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
