import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { catagoryOptions } from "../../../app/common/options/catagoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { ActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity } = activityStore;
  const { loadActivity, loadingInitial, deselectActivity } = activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    date: Yup.string().required("date is a required field").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
    return () => {
      deselectActivity();
    };
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <Loading content="Loading activity..." />;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="title" />
            <TextArea placeholder="Description" name="description" rows={3} />
            <SelectInput
              options={catagoryOptions}
              placeholder="Category"
              name="category"
            />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            <Header content="LOcation Details" sub color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              as={Link}
              to="/activities"
              loading={isSubmitting}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
