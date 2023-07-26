import { useState } from "react";
import { addMember } from "../api/groups";

type AddMemberState = {
  isLoading: boolean;
  error: string | null;
};

export const useAddMember = (): [(uid: string, idGroup: string, role: string) => Promise<void>, AddMemberState] => {
  const [state, setState] = useState<AddMemberState>({
    isLoading: false,
    error: null,
  });

  const handleAddMember = async (uid: string, idGroup: string, role: string): Promise<void> => {
    setState({ isLoading: true, error: null });

    try {
      await addMember(uid, idGroup, role);
      setState({ isLoading: false, error: null });
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message });
    }
  };

  return [handleAddMember, { ...state }];
};
