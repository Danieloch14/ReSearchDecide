import { View } from "native-base";
import React from 'react'
import tw from 'twrnc'
import { StyleSheet, TextInput } from "react-native";
import { GroupListComponent } from "../../../components/GroupListComponent";
import { Group } from "../../../model/Group";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../../../assets/incons";
import useGroups from "../../../hooks/use-groups";


// const DATA: Group[] = [
//   {
//     id: 1,
//     name: 'Group Todo lo que quiero',
//     adminName: 'Timoteo Camuendo',
//     description: 'This is a group'
//   },
//   {
//     id: 2,
//     name: 'Group Todo lo no que quiero',
//     adminName: 'Alberto Camuendo',
//     description: 'This is a group'
//   },
//   {
//     id: 3,
//     name: 'Group Todo lo que quiero y no quiero',
//     adminName: 'Roxana Castro',
//     description: 'This is a group'
//   }
// ]

export const GroupListScreen = () => {

  const groups = useGroups()
  console.log(groups)

  return (
      <View>
        <View style={ tw`flex flex-row items-center bg-gray-100  p-2 rounded gap-2 mb-3` }>
          <FontAwesomeIcon icon={ icons.search } style={ styles.icon }/>
          <TextInput placeholder="Search..." style={ tw`flex-1` }/>
        </View>
        <GroupListComponent groups={ groups }/>
      </View>
  )
}


const styles = StyleSheet.create({
  icon: {
    color: '#000',
  },
})
