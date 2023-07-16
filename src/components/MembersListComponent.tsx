import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { User } from "../model/User";
import icons from '../../assets/incons';

import tw from "twrnc";
import { StyleSheet } from "react-native";
import { Pressable, Select } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type MemberListComponentProps = {
  users: User[]
}

const MembersListComponent = ({ users }: MemberListComponentProps) => {
  const [selectedId, setSelectedId] = React.useState<any>(null);

  const handleValueChange = (id: string) => {
    const isSelected = selectedId === id;
    if (isSelected) {
      setSelectedId(null);
      console.log(null);
    } else {
      setSelectedId(id);
      console.log(id);
    }
  };

  return (
      <View>
        <FlatList
            data={ users }
            renderItem={ ({ item }) => (
                <View style={ tw`py-3 flex-row  items-center border-b border-gray-200` }>
                  <View>
                    <Text style={ tw`font-medium` }>{ item.name }</Text>
                  </View>
                  <Select>
                    <Select.Item label="Admin" value="Admin" />
                    <Select.Item label="Member" value="Member" />
                  </Select>
                  <Pressable
                      onPress={ () => handleValueChange(item.id.toString()) }
                  >
                    <FontAwesomeIcon icon={icons.trash} size={18} color={'#a8a8a8'} />
                  </Pressable>
                </View>
            ) }
            keyExtractor={ ({ id }) => id.toString() }
        />
      </View>
  );
};

export default MembersListComponent;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#146C94',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
