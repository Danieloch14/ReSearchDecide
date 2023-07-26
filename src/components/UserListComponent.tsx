import React from 'react';
import { FlatList, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { User } from "../model/User";
import tw from "twrnc";
import { StyleSheet } from "react-native";
import { ScrollView } from "native-base";
import { useAddMember } from "../hooks/use-add-member";

type UserListComponentProps = {
  users: User[],
  groupId: string,
  onMembersAdded: () => void
}

const UserListComponent = ({ users, groupId, onMembersAdded }: UserListComponentProps) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [handleAddMember, addMemberState] = useAddMember();

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

  const handleAddMembers = async () => {
    try {
      for (const id of selectedIds) {
        await handleAddMember(id, groupId, 'memberRole');
      }
      console.log('Members added successfully!');
      setSelectedIds([]);

      onMembersAdded();
    } catch (error) {
      console.error('Error adding members:', error);
    }
  };

  return (
      <SafeAreaView>
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
                        title="Select"
                        checked={ selectedIds.includes(item.uid) }
                        onPress={ () => handleValueChange(item.uid) }
                    />
                  </View>
              ) }
              keyExtractor={ ({ uid }) => uid }
          />
          <TouchableOpacity
              disabled={ selectedIds.length === 0 }
              style={ [tw`rounded mt-8`, styles.button, selectedIds.length === 0 && styles.disabledButton] }
              onPress={ () => handleAddMembers() }
          >
            <Text style={ tw`text-white text-center` }>Add members</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
