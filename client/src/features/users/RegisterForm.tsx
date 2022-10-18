import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { toast } from "react-toastify";
import showErrors from "../errors/showErrors";

function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => showErrors(error.response.data.errors))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            color="black"
            content="Sign up to Reactivities"
            textAlign="center"
          />
          <TextInput name="displayName" placeholder="Display Name" />
          <TextInput name="username" placeholder="Username" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
