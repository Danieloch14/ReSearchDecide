import React, { useState, useEffect } from 'react';
import { AuthenticatedLayout } from "../../../components/layout/AuthenticatedLayout";
import { CreateGroupForm, CreateGroupFormValues } from "../../../components/forms/CreateGroupForm";
import { useCreateGroup } from "../hooks/use-create-group";
import { Text } from "native-base";
import tw from "twrnc";
import { useMembersList } from "../../../hooks/use-members-list";

export const CreateGroupScreen = () => {
  const [isGroupCreated, setGroupCreated] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState<string | null>(null);
  const [handleCreateGroup, createGroupState] = useCreateGroup();
  const messageGroupCreated = 'Group created successfully';
  const messageError = 'Error creating group. Please try again later.';

  const handleSubmit = async (values: CreateGroupFormValues) => {
    try {
      const createdGroup = await handleCreateGroup(values);
      setGroupCreated(true);
      setCreatedGroupId(createdGroup?.id || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isGroupCreated && createdGroupId) {
      // Llamar a la función para obtener los miembros del grupo
      // Puedes usar "createdGroupId" para hacer la consulta y mostrar los miembros
      console.log('Group created:', createdGroupId);

      // Obtener los miembros del grupo
      const members = useMembersList(createdGroupId);
      console.log('Members of the group:', members);
    }
  }, [isGroupCreated, createdGroupId]);

  return (
      <AuthenticatedLayout>
        { createGroupState.error ? (
            <Text style={ tw`text-red-500 my-2` }>{ messageError }</Text>
        ) : (
            <>
              { isGroupCreated && <Text style={ tw`text-green-500 my-2` }>{ messageGroupCreated }</Text> }
              { createGroupState.isLoading && <Text style={ tw`text-yellow-500 my-2` }>Creating group...</Text> }
            </>
        ) }
        <CreateGroupForm
            onSubmit={ handleSubmit }
            buttonText={ 'Create group' }
            isLoading={ createGroupState.isLoading }
            groupId={ createdGroupId }
        />
      </AuthenticatedLayout>
  );
};
