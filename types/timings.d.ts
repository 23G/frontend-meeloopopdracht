import { IUser, TISOString } from "~/types";

export interface ITiming {
  id?: number
  laptime: number
  userId: IUser['id']
  datetime: TISOString
}

export type TTimingList = Array<ITiming>
