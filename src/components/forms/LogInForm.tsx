import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export type LoginFormValues = {
  email: string;
  password: string;
};

const buildValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
  });
};

export const LogInForm = ({ onSubmit, buttonText, isLoading }: {
  onSubmit: (values: LoginFormValues) => void,
  buttonText: 'Log in',
  isLoading: boolean
}) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: buildValidationSchema(),
    onSubmit: handleSubmit,
  });

  return (
      <View>
        <TextInput
            placeholder="Email"
            onChangeText={ formik.handleChange('email') }
            onBlur={ formik.handleBlur('email') }
            value={ formik.values.email }
        />
        { formik.touched.email && formik.errors.email && (
            <Text>{ formik.errors.email }</Text>
        ) }

        <TextInput
            placeholder="Password"
            onChangeText={ formik.handleChange('password') }
            onBlur={ formik.handleBlur('password') }
            value={ formik.values.password }
            secureTextEntry
        />
        { formik.touched.password && formik.errors.password && (
            <Text>{ formik.errors.password }</Text>
        ) }

        <TouchableOpacity onPress={ () => formik.handleSubmit() } disabled={ isLoading }>
          <Text>{ buttonText }</Text>
        </TouchableOpacity>
      </View>
  );
};

export default LogInForm;
