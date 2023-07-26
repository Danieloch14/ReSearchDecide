import { useEffect, useState } from 'react';
import { getGroupMembers } from '../api/groups';
import { Member } from '../model/Member';

export const useMembersList = (groupId: string): [Member[], () => void] => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchGroupMembers = async () => {
    try {
      const members = await getGroupMembers(groupId);
      setMembers(members);
    } catch (error) {
      console.error('Error fetching group members:', error);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchGroupMembers().then();
  }, [groupId]); // Only fetch members when groupId changes

  const refreshMembers = () => {
    fetchGroupMembers().then(); // Manually fetch members again
  };

  return [members, refreshMembers]; // Return members and refresh function as an array
};
