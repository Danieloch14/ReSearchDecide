import React, { useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useMembersList } from "../hooks/use-members-list";
import { Member } from "../model/Member";

type MembersListComponentProps = {
  groupId: string;
};

const MembersListComponent = ({ groupId }: MembersListComponentProps) => {
  const [members, refreshMembers] = useMembersList(groupId);

  console.log('supuestamete todos los miembros', members);

  useEffect(() => {
    // Call the refreshMembers function whenever groupId changes
    refreshMembers();
  }, [groupId]);

  return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}>
          <TouchableOpacity onPress={refreshMembers} style={{ padding: 8 }}>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Members List</Text>
        <FlatList
            data={members}
            renderItem={({ item }) => (
                <View style={{ paddingVertical: 4 }}>
                  <Text>{item.userName}</Text>
                </View>
            )}
            keyExtractor={(item) => item.userId}
        />
      </View>
  );
};

export default MembersListComponent;
