import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getCurrentUser, getDBUserByUid} from './user';
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
      const members: Member[] = data.members.map((member: Member) => {
        return {
          uid: member.userId,
          groupId: member.groupId,
          displayName: member.username,
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


export const deleteGroupById = async (groupId: string): Promise<void> => {
  await groupCollection.doc(groupId).delete();
}

export const deleteGroupByName = async (groupName: string): Promise<void> => {
  const querySnapshot = await groupCollection.where("name", "==", groupName).get();

  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
}

export const deleteMemberById = async(memberId: string, groupId: string): Promise<void> => {
  const memberCollection = groupCollection.doc(groupId).collection("members");
  await memberCollection.doc(memberId).delete();
}

export const listMembers = async (groupId: string): Promise<Member[]> => {
  const memberCollection = groupCollection.doc(groupId).collection("members");
  const querySnapshot = await memberCollection.get();
  const members: Member[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Member;

    const member: Member = {
      userId: data.userId,
      groupId: data.groupId,
      username: data.username,
      email: data.email,
      role: data.role,
    };

    members.push(member);
  });

  return members;
}

export const updateMemberRole = async (memberId: string, groupId: string, newRole: string): Promise<void> => {
  const memberCollection = groupCollection.doc(groupId).collection("members");
  await memberCollection.doc(memberId).update({ role: newRole });
}


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









