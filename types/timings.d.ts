import { IUser, TISOString } from "~/types";

export interface ITiming {
  id: number
  userId: IUser['id']
  datetime: TISOString
  laptime: number
}

export type TTimingList = Array<ITiming>
