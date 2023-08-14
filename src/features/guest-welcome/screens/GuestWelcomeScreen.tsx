import React, { FC } from 'react';
import { VStack, Center, Button, Text, Heading, Box, View } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/types';
import { AppBanner } from "../../../components/util/AppBanner";
import { Platform } from 'react-native';
import { useMediaQuery } from 'react-responsive';
import tw from "twrnc";
import LogInScreen from "../../log-in/screens/LogInScreen";
import { GuestLayout } from "../../../components/layout/GuestLayout";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'GuestWelcome'>;
};

export const GuestWelcomeScreen: FC<Props> = ({ navigation }) => {
  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn');
  };

  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });

  return (
      <GuestLayout>
        <View style={ tw`w-full h-full mt-5 px-10` }>
          { isTabletOrMobile ? (
              <View style={ tw`flex-col justify-center items-center` }>
                <View style={ tw`w-full mb-4` }>
                  <AppBanner/>
                </View>
                <View style={ tw`w-full` }>
                  <LogInScreen/>
                </View>
              </View>
          ) : (
              <View style={ tw`flex-row justify-around items-center` }>
                <View style={ tw`flex-2 pr-2` }>
                  <AppBanner/>
                </View>
                <View style={ tw`flex-1 pl-2` }>
                  <LogInScreen/>
                </View>
              </View>
          ) }
        </View>
      </GuestLayout>
  );
};
