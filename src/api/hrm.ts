import { Client } from "./client";
import { IOption } from "../index";

type Options = {
  size: number;
  offset: number;
  status_list: "2" | "3" | "5" | "-1"
}

type EmpListRes = {
  data_list: string[];
  next_cursor: number;
}

type RosterInfo = {
  userid: string;
  field_list: {
    value: string;
    label: string;
    group_id: string;
    field_code: string;
    field_name: string;
  }[]
}

type Result<T> = {
  errmsg: string;
  errcode: string;
  success: boolean;
  request_id: string;
  result: T
};

type Group = {
  group_id: string;
  sections: {
    value: string;
    field_code: string;
  }[]
}

enum API {
  RosterList = "list",
  QueryOnJob = "queryonjob",
  QueryDimission = "querydimission"
}

/*
 * 职能人事 API
 */
export class HRM {
  constructor(private readonly client: Client, private readonly options: IOption) {
  }

  /*
   * 在职员工列表
   */
  async getOnJobList(data: Options) {
    return this.request<EmpListRes>(API.QueryOnJob, data);
  }

  /*
   * 离职员工列表
   */
  async getDimissionList(data: Options) {
    return this.request<EmpListRes>(API.QueryDimission, data);
  }

  /*
   * 员工花名册列表
   */
  async getRosterList(userid_list: string[], field_filter_list?: string[]) {
    const data: { userid_list: string, field_filter_list?: string } = {
      userid_list: userid_list.join(",")
    };
    if (field_filter_list?.length) {
      data.field_filter_list = field_filter_list?.join(",");
    }

    return this.request<RosterInfo[]>(API.RosterList, data);
  }

  /*
   * 更新花名册
   */
  async updateRosterById(userId: string, groups: Group[]) {
    const data = {
      agentid: this.options.agentId,
      param: {
        userid: userId,
        groups: groups.map(x => {
          x.sections.map(x => ({ section: x }));
          return x;
        })
      }
    };

    return this.request<boolean>(API.RosterList, data);
  }

  private async request<T>(api: string, data): Promise<T> {
    const res = await this.client.post<Result<T>>(`topapi/smartwork/hrm/employee/${api}`, data);
    if (res.success) {
      return res.result;
    } else {
      throw new Error(res.errmsg);
    }
  }
}
