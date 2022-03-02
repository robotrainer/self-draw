import { IUser } from "../IUser";

export interface DrawingResponse {
  id: number;
  title: string;
  url: string;
  createDate: string;
  likes: number;
  publication: boolean;
  author: IUser;
}