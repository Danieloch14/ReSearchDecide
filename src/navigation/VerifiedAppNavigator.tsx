import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from "../features/home/screens/HomeScreen";
import { StyleSheet } from "react-native";


const Stack = createStackNavigator()

export const VerifiedAppNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={ HomeScreen }
          options={ { title: 'GRUPOS DE INVESTIGACIÓN', headerTitleStyle: headerTitleStyle.headerTitle } }

      />
    </Stack.Navigator>
)

const headerTitleStyle = StyleSheet.create({
  headerTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '300',
    paddingVertical: 10,
  },
});
