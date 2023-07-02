import React from 'react';
import { View, Text } from 'native-base';
import tw from 'twrnc';
import { StyleSheet } from 'react-native';
import { useLogIn } from "../hooks/use-log-in";
import LogInForm from "../../../components/forms/LogInForm";

export const LogInScreen = () => {

  const [logIn, { isLoading, error }] = useLogIn();


  return (
      <View
          style={ [
            styles.shadow, styles.border,
            tw.style('py-7 px-15 bg-white')
          ] }
      >
        <Text style={ tw.style('text-center font-bold text-2xl') }>
          Log In
        </Text>
        <LogInForm onSubmit={ logIn } buttonText={ "Log in" } isLoading={ isLoading }/>
      </View>
  );
}

export default LogInScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 30,
    blurRadius: 50,

  },
  border: {
    borderRadius: 45,
    borderWidth: 0,
  }
});