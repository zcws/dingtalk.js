type Err = {
  errmsg: string,
  errcode: number,
}

type BoolField = Record<"isBoss" | "isSenior" | "active" | "isAdmin" | "isHide", boolean>
type StringField = Record<"unionid" | "remark" | "userid" | "tel" | "workPlace" | "email" | "orderInDepts" | "mobile" | "avatar" | "jobnumber" | "name" | "stateCode" | "position", string>

type UserInfo = Err & {
  userid: string,
  is_sys: boolean,
  sys_level: number
};

namespace DingTalk {
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
}
