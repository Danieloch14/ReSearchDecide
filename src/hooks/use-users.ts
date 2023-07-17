import { useEffect, useState } from "react";
import { User } from "../model/User";
import { getUsers } from "../api/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.log(error);
        setUsers([]);
      }

    };

    fetchUsers().then();
  }, []);

  return users;
};