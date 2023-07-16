import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getCurrentUser, getDBUserByUid} from './user';


interface Group {
  id?: string;
  name: string;
  description: string;
  members: string[];
}

interface Member {
  userId: string;
  groupId: string;
  username: string;
  email: string;
}


const db = firebase.firestore();
const groupCollection = db.collection("groups");
const counterDocRefGroup = db.collection("Counters").doc("GroupCounter");
const memberCollection = groupCollection.doc().collection("members");
const counterDocRefMember = db.collection("Counters").doc("MemberCounter");

async function saveGroup(group: Group): Promise<void> {
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
  
    await createMember(uid, groupId);
  }
 
}

const getGroupByName = async (name: string): Promise<Group | null> => {
  const snapshot = await groupCollection.where("name", "==", name).get();
  if (snapshot.empty) {
    return null;
  }
  const group = snapshot.docs[0].data() as Group;
  return group;
};




async function createMember(uid: string, id: string): Promise<void> {
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
      id,
      displayName,
      email,
    });
  }
}







export const deleteGroup = async (groupId: string): Promise<void> => {
  try {
    await firebase.firestore().collection('groups').doc(groupId).delete();
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async (): Promise<any> => {
  try {
    const snapshot = await firebase.firestore().collection('groups').get();
    const groups = snapshot.docs.map((doc) => doc.data());
    return groups;
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
