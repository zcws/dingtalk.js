type Err = {
  errmsg: string,
  errcode: number,
}

type BoolField = Record<"isBoss" | "isSenior" | "active" | "isAdmin" | "isHide", boolean>
type StringField = Record<"unionid" | "remark" | "userid" | "tel" | "workPlace" | "email" | "orderInDepts" | "mobile" | "avatar" | "jobnumber" | "name" | "stateCode" | "position", string>

export interface GetUserId extends Err {
  userid: string;
}

export interface UserInfo extends GetUserId {
  userid: string,
  is_sys: boolean,
  sys_level: number
}

export interface IUser extends Err, StringField, BoolField {
  hiredDate: number,
  department: number[],
  extattr: {
    [key: string]: string | number
  },
  roles: Array<{
    id: number,
    name: string,
    groupName: string
  }>
}
