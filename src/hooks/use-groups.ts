import { useEffect, useState } from 'react';
import { getGroups } from '../api/groups';
import { Group } from "../model/Group";


const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await getGroups();
        setGroups(groupsData);
      } catch (error) {
        console.log(error);
        setGroups([]);
      }
    };

    fetchGroups().then();
  }, []);

  return groups;
};

export default useGroups;
