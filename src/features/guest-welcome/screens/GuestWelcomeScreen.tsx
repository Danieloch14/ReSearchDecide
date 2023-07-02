import React, { FC } from 'react';
import { VStack, Center, Button, Text, Heading, Box, HStack, View } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/types';

import tw from 'twrnc'
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { LogInScreen } from "../../log-in/screens/LogInScreen";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'GuestWelcome'>;
};

export const GuestWelcomeScreen: FC<Props> = ({ navigation }) => {
  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
      <GuestLayout>
        <View>
          <Text style={ tw.style('text-center text-3xl font-bold mb-3') }>
            INVESTIGATION GROUPS
          </Text>
          <Text style={ tw.style('text-center text-2xl font-medium text-gray-500 mb-10') }>
            Meet researchers who share your interests
          </Text>

          <LogInScreen/>

        </View>
      </GuestLayout>
  );
};



