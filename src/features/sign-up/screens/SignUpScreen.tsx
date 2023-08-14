import React from 'react';
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { AppBanner } from "../../../components/util/AppBanner";
import SignUpForm from "../../../components/forms/SignUpForm";
import { ScrollView } from "native-base";
import { Platform, StyleSheet, View } from "react-native";
import { useSignUp } from "../hooks/use-sign-up";
import tw from "twrnc";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import ErrorMessage from "../../../components/util/ErrorMessage";
import { useMediaQuery } from "react-responsive";

export const SignUpScreen = () => {
  const [signUp, { isLoading, error }] = useSignUp();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });

  return (
      <ScrollView contentContainerStyle={ styles.container }>
        <GuestLayout>
          { isTabletOrMobile ? (
              <View style={ tw`flex-col items-center justify-center w-full h-full mt-5 px-10 ` }>
                <View style={ tw`w-full mb-4` }>
                  <AppBanner/>
                </View>
                <View style={ tw`w-full` }>
                  { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
                  { error && <ErrorMessage error={ error }/> }
                  <SignUpForm onSubmit={ signUp } buttonText={ 'Create account' } isLoading={ isLoading }/>
                </View>
              </View>
          ) : (
              <View style={ tw`flex-row justify-around items-center` }>
                <View style={ tw`flex-2 pr-2` }>
                  <AppBanner/>
                </View>
                <View style={ tw`flex-1 pr-2` }>
                  { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
                  { error && <ErrorMessage error={ error }/> }
                  <SignUpForm onSubmit={ signUp } buttonText={ 'Create account' } isLoading={ isLoading }/>
                </View>
              </View>
          ) }
        </GuestLayout>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
