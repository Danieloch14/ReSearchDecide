import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import tw from 'twrnc';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import icons from '../../../../assets/incons';
import useGroupsList from '../../../hooks/use-groups-list';
import { GroupListComponent } from '../../../components/GroupListComponent';

export const GroupListScreen = () => {
  const { groups, loading } = useGroupsList();
  console.log(groups);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  let filteredGroups = groups;

  if (searchValue !== '') {
    filteredGroups = groups?.filter((group) =>
        group.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
      <View>
        <View style={tw`flex flex-row items-center bg-gray-100 p-2 rounded gap-2 mb-3`}>
          <FontAwesomeIcon icon={icons.search} style={styles.icon} />
          <TextInput
              onChangeText={handleSearch}
              value={searchValue}
              placeholder="Search..."
              style={tw`flex-1`}
          />
        </View>
        {loading ? (
            <Text>Loading...</Text>
        ) : filteredGroups.length > 0 ? (
            <GroupListComponent groups={filteredGroups} />
        ) : (
            <Text>No groups found.</Text>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#000',
  },
});
