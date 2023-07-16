import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { User } from "../model/User";
import tw from "twrnc";
import { StyleSheet } from "react-native";

type UserListComponentProps = {
  users: User[]
}

const UserListComponent = ({ users }: UserListComponentProps) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);


  const handleValueChange = (id: string) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      const updatedIds = selectedIds.filter((selectedId) => selectedId !== id);
      setSelectedIds(updatedIds);
      console.log(updatedIds);
    } else {
      setSelectedIds([...selectedIds, id]);
      console.log([...selectedIds, id]);
    }
  };

  return (
      <View>
        <FlatList
            data={ users }
            renderItem={ ({ item }) => (
                <View style={ tw`py-1 flex-row justify-between items-center border-b border-gray-200` }>
                  <View>
                    <Text style={ tw`font-medium` }>{ item.displayName }</Text>
                    <Text>{ item.email }</Text>
                  </View>
                  <CheckBox
                      title=""
                      checked={ selectedIds.includes(item.id.toString()) }
                      onPress={ () => handleValueChange(item.id.toString()) }
                  />
                </View>
            ) }
            keyExtractor={ ({ id }) => id.toString() }
        />
        <TouchableOpacity
            disabled={ selectedIds.length === 0 }
            style={ [tw`rounded mt-8`, styles.button, selectedIds.length === 0 && styles.disabledButton] }
            onPress={ () => console.log(selectedIds) }
        >
          <Text style={ tw`text-white text-center` }>Add members</Text>
        </TouchableOpacity>
      </View>
  );
};

export default UserListComponent;

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
