import { useEffect, useState } from 'react';
import { getGroupMembers } from '../api/groups';
import { Member } from "../model/Member";

export const useMembersList = (groupId: string): Member[]  => {
  const [members, setMembers] = useState<Member[] >([]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const members = await getGroupMembers(groupId);
        console.log(members);
        setMembers(members);
      } catch (error) {
        console.error('Error fetching group members:', error);
        setMembers([] as Member[]);
      }
    };

    fetchGroupMembers().then();
  }, [groupId]);

  return members;
};
