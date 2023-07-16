import { View } from "native-base";
import React, { useState } from 'react'
import tw from 'twrnc'
import { StyleSheet, TextInput } from "react-native";
import { GroupListComponent } from "../../../components/GroupListComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../../../assets/incons";
import useGroups from "../../../hooks/use-groups";


export const GroupListScreen = () => {
  const groups = useGroups();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  let filteredGroups = groups;

  if (searchValue !== '') {
    filteredGroups = groups.filter((group) =>
        group.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
      <View>
        <View style={ tw`flex flex-row items-center bg-gray-100  p-2 rounded gap-2 mb-3` }>
          <FontAwesomeIcon icon={ icons.search } style={ styles.icon }/>
          <TextInput
              onChangeText={ handleSearch }
              value={ searchValue }
              placeholder="Search..."
              style={ tw`flex-1` }
          />
        </View>
        <GroupListComponent groups={ filteredGroups }/>
      </View>
  );
};


const styles = StyleSheet.create({
  icon: {
    color: '#000',
  },
})
