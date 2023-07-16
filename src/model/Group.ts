import { Member } from "./Member";

export interface Group {
  id?: number | string;
  name: string;
  description: string;
  members: Member[];
}