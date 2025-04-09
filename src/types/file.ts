import { User } from "./user";

export interface IFile {
    id: number;
    name: string;
    path: string;
    type: string;
    size: number;
    created_at: Date;
    updated_at: Date;
    user: User
  }