import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const db = firebase.firestore();	
interface Member{
    id: number,
    name: string,
    role: string,
    state: boolean
}

export const saveNewGroup = async ({name = '', description = '', members: []}: {name: string; description: string; members: Member[]}): Promise<void> => {
    if (name === "" || description === "") {
      alert("please provide a name or a corrct description");
    } else {

      try {
        await  db.collection("groups").add({
          name: name,
          edescription: description,
        });

      } catch (error) {
        console.log(error)
      }
    }
  };

export const addMember =async () => {}

export const deleteGroup = async () => {}

export const getGroups = async () => {}

export const getGroup = async () => {}

export const updateGroup = async () => {}

export const getMembers = async () => {}

export const getMember = async () => {}

export const updateMember = async () => {}

export const deleteMember = async () => {}

