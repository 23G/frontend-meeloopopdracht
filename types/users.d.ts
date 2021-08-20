export interface IUser {
  id: number
  first_name: string
  last_name: string
  last_name_prefix?: string
}

export type TUserList = Array<IUser>
