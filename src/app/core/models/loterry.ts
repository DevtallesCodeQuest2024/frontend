import { IUser } from "./user";

export interface ILottery {
  id?:            number;
  name:           string;
  description:    string;
  prize:          string;
  startDate:      string;
  endDate:        string;
  active?:        boolean;
  users?:         IUser[];
}
