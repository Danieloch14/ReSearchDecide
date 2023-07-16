import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getCurrentUser, getDBUserByUid} from './user';
import { GroupItemComponent } from "../components/GroupItemComponent";
import { Group } from "../model/Group";
import { Member } from "../model/Member";

const db = firebase.firestore();
const groupCollection = db.collection("groups");
const memberCollection = groupCollection.doc().collection("members");

export const saveGroup = async (group: Group): Promise<void> => {
  const user = await getCurrentUser();
  // Verify if the "groups" collection exists
  const collectionSnapshot = await groupCollection.limit(1).get();
  const collectionExists = !collectionSnapshot.empty;

  // If the collection does not exist, create an empty document for it
  if (!collectionExists) {
    await groupCollection.doc().set({});
  }

  if (user) {
    const { uid } = user;
  
    const groupDocRef = await groupCollection.add({
      name: group.name,
      description: group.description,
      members: [uid],
    });
  
    const groupId = groupDocRef.id;
  
    await createMember(uid, groupId, 'admin');
  }
 
}



export const createMember = async(uid: string, idGroup: string, role: string): Promise<void> => {
  // Verify if the "Group" collection exists
  const collectionSnapshot = await groupCollection.limit(1).get();
  const collectionExists = !collectionSnapshot.empty;

  // If the collection does not exist, create an empty document for it
  if (!collectionExists) {
    await groupCollection.doc().collection("members").add({});
  }

  const user = await getDBUserByUid(uid);

  if (user) {
    const { uid: userUid, displayName, email } = user;

    await memberCollection.add({
      uid: userUid,
      id: idGroup,
      displayName,
      email,
      role: role,
    });
  }
}


export const getGroups = async(): Promise<Group[]> => {
  try {
    const querySnapshot = await groupCollection.get();
    const groups: Group[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const members: Member[] = data.members.map((member: any) => {
        return {
          id: member.uid,
          displayName: member.displayName,
          email: member.email,
          role: member.role,
        };
      });

      const group: Group = {
        id: doc.id,
        name: data.name,
        description: data.description,
        members: members,
      };

      groups.push(group);
    });

    return groups;
  } catch (error) {
    console.log(error);
    return [];
  }
}





export const deleteGroup = async (groupId: string): Promise<void> => {
  try {
    await firebase.firestore().collection('groups').doc(groupId).delete();
  } catch (error) {
    console.log(error);
  }
};

// export const getGroups = async (): Promise<Group[]> => {
//   try {
//     const snapshot = await firebase.firestore().collection('groups').get();
//     console.log('snapshot de firebase', snapshot);
//     const groups: Promise<Group>[] = snapshot.docs.map(async (doc) => {
//       const data = doc.data();
//       console.log('data de firebase', data);
//       const memberRefs = data.members || [];
//       const memberPromises = memberRefs.map((ref: { get: () => any; }) => ref.get());
//       const memberSnapshots = await Promise.all(memberPromises);
//       const members: Member[] = await Promise.all(memberSnapshots.map(async (snapshot) => {
//         const memberData = snapshot.data();
//         const userRef = memberData.user;
//         console.log('userRef de firebase', userRef);
//         const userSnapshot = await userRef.get();
//         const userData = userSnapshot.data();
//         console.log('userData de firebase', userData);
//         return {
//           id: snapshot.id,
//           name: userData.displayName,
//           role: memberData.role,
//         };
//       }));
//       return {
//         id: doc.id,
//         name: data.name,
//         description: data.description,
//         members: members,
//       };
//     });
//     return Promise.all(groups);
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };






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
  memberId: string
): Promise<any> => {
  try {
    const doc = await firebase.firestore().collection('groups').doc(groupId).get();
    if (doc.exists) {
      const groupData = doc.data();
      if (groupData && groupData.members) {
        const member = groupData.members.find(
          (member: Member) => member.userId === memberId
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
