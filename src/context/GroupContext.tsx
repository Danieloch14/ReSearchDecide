import React, { createContext, useContext, useState } from 'react';
import { Group } from "../model/Group";

type GroupsContextType = {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
};

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  return (
      <GroupsContext.Provider value={ { groups, setGroups } }>
        { children }
      </GroupsContext.Provider>
  );
};

export const useGroupsContext = (): GroupsContextType => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroupsContext must be used within a GroupContextProvider");
  }
  return context;
};
