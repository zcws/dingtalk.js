import { Client } from "../client";
import { Base } from "../base";

export type ProcessInstance = {
  title: string;
  result: string;
  create_time: Date;
  finish_time: Date;
  biz_action: string;
  business_id: string;
  cc_userids: string[];
  originator_userid: string;
  originator_dept_id: string;
  approver_userids: string[];
  originator_dept_name: string;
  main_process_instance_id: string;
  attached_process_instance_ids: string[];
  status: "NEW" | "RUNNING" | "TERMINATED" | "COMPLETED" | "CANCELED";
}

type GetIdsOptions = {
  size?: number;
  cursor?: number;
  end_time?: number;
  start_time: number;
  userid_list?: string;
  process_code: string;
}

/*
 * 成员相关 API
 * @type {User}
 */
export class Process extends Base {
  protected readonly uri = "topapi/processinstance";

  constructor(client: Client) {
    super(client);
  }

  /*
   * 获取审批实例
   */
  async getInstanceById(id: string) {
    return this.post<ProcessInstance>("get", { process_instance_id: id });
  }

  async getInstanceIds(options: GetIdsOptions) {
    return this.post<{ list: string[], next_cursor: number }>("listids", options);
  }
}
