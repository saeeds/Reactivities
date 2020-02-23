import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, FormFieldProps } from 'semantic-ui-react';
import { IActivityFormValues } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/strores/activityStore';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { DateInput } from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    activity: initialFormState,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivityFormValues>({
    id: undefined,
    title: '',
    category: '',
    description: '',
    date: undefined,
    time: undefined,
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id && !activity.id) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    match.params.id,
    clearActivity,
    initialFormState,
    activity.id
  ]);

  // const handleSubmit = () => {
  //   if (!initialFormState) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`activities\${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(initialFormState).then(() =>
  //       history.push(`activities\${newActivity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                  component={TextInput as any}
                />
                <Field
                  name='description'
                  placeholder='Description'
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput as any}
                />
                <Field
                  placeholder='Category'
                  options={category}
                  name='category'
                  value={activity.category}
                  component={SelectInput as any}
                />
                <Form.Group widths='equal'>
                  <Field
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={activity.date}
                    component={DateInput as any}
                  />
                  <Field
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={activity.time}
                    component={DateInput as any}
                  />
                </Form.Group>

                <Field
                  placeholder='City'
                  name='city'
                  value={activity.city}
                  component={TextInput as any}
                />
                <Field
                  placeholder='Venue'
                  name='venue'
                  value={activity.venue}
                  component={TextInput as any}
                />
                <Button
                  loading={submitting}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  floated='right'
                  type='button'
                  content='Cancel'
                  onClick={() => history.push(`/activities/${activity.id}`)}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
