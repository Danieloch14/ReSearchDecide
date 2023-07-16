import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getCurrentUser} from './user';
import { GroupItemComponent } from "../components/GroupItemComponent";
import { Group } from "../model/Group";

interface Member {
  id: number,
  name: string,
  role: string,
  state: boolean
}

export const saveNewGroup = async ({
  id = 0,
  name = '',
  description = '',
  members = []
}: {
  id: number;
  name: string;
  description: string;
  members: Member[]
}): Promise<void> => {

  if (name === "" || description === "") {
    alert("please provide a name or a correct description");
  } else {

    try {
      await firebase.firestore().collection("groups").add({
        name: name,
        description: description,
        members: members,
      });

    } catch (error) {
      console.log(error)
    }
  }
};

export const addMember = async (
  groupId: string,
  member: Member
): Promise<void> => {
  try {
    await firebase.firestore().collection('groups').doc(groupId).update({
      members: firebase.firestore.FieldValue.arrayUnion(member),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = async (groupId: string): Promise<void> => {
  try {
    await firebase.firestore().collection('groups').doc(groupId).delete();
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async (): Promise<Group[]> => {
  try {
    const snapshot = await firebase.firestore().collection('groups').get();
    console.log('snapshot de firebase', snapshot);
    const groups: Promise<Group>[] = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      console.log('data de firebase', data);
      const memberRefs = data.members || [];
      const memberPromises = memberRefs.map((ref: { get: () => any; }) => ref.get());
      const memberSnapshots = await Promise.all(memberPromises);
      const members: Member[] = await Promise.all(memberSnapshots.map(async (snapshot) => {
        const memberData = snapshot.data();
        const userRef = memberData.user; // Obtener la referencia al usuario
        console.log('userRef de firebase', userRef);
        const userSnapshot = await userRef.get(); // Obtener los datos del usuario
        const userData = userSnapshot.data();
        console.log('userData de firebase', userData);
        return {
          id: snapshot.id,
          name: userData.displayName, // Agregar el nombre del usuario
          role: memberData.role,
          state: memberData.state,
          // Agrega aquí los campos adicionales del miembro según sea necesario
        };
      }));
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        members: members,
      };
    });
    return Promise.all(groups);
  } catch (error) {
    console.log(error);
    return [];
  }
};






export const getGroup = async (groupId: string): Promise<any> => {
  try {
    const doc = await firebase.firestore().collection('groups').doc(groupId).get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.log('Group not found');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateGroup = async (
  groupId: string,
  newData: { name?: string; description?: string; members?: Member[] }
): Promise<void> => {
  try {
    await firebase.firestore().collection('groups').doc(groupId).update(newData);
  } catch (error) {
    console.log(error);
  }
};

export const getMembers = async (groupId: string): Promise<any> => {
  try {
    const doc = await firebase.firestore().collection('groups').doc(groupId).get();
    if (doc.exists) {
      const groupData = doc.data();
      if (groupData && groupData.members) {
        return groupData.members;
      } else {
        console.log('Members not found');
        return [];
      }
    } else {
      console.log('Group not found');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMember = async (
  groupId: string,
  memberId: number
): Promise<any> => {
  try {
    const doc = await firebase.firestore().collection('groups').doc(groupId).get();
    if (doc.exists) {
      const groupData = doc.data();
      if (groupData && groupData.members) {
        const member = groupData.members.find(
          (member: Member) => member.id === memberId
        );
        if (member) {
          return member;
        } else {
          console.log('Member not found');
          return null;
        }
      } else {
        console.log('Members not found');
        return null;
      }
    } else {
      console.log('Group not found');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateMember = async (
  groupId: string,
  memberId: number,
  newData: { name?: string; role?: string; state?: boolean }
): Promise<void> => {
  try {
    await firebase.firestore()
      .collection('groups')
      .doc(groupId)
      .update({
        'members': firebase.firestore.FieldValue.arrayRemove({
          'id': memberId,
        }),
      });
    await firebase.firestore()
      .collection('groups')
      .doc(groupId)
      .update({
        'members': firebase.firestore.FieldValue.arrayUnion({
          'id': memberId,
          ...newData,
        }),
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMember = async (
  groupId: string,
  memberId: number
): Promise<void> => {
  try {
    await firebase.firestore()
      .collection('groups')
      .doc(groupId)
      .update({
        'members': firebase.firestore.FieldValue.arrayRemove({
          'id': memberId,
        }),
      });
  } catch (error) {
    console.log(error);
  }
};
