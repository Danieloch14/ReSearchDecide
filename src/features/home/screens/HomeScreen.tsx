import React from 'react'
import PropTypes from 'prop-types'
import { VStack, Center, Heading, Button, View, Text } from 'native-base'
import { useUserContext } from '../../../context/UserContext'
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {

  const navigation = useNavigation()

  const { user } = useUserContext()

  return (
      <View>
        <Text>
          { user?.email }
        </Text>
      </View>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
