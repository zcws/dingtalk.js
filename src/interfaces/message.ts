interface WorkNoticeOptions {
  agent_id: number;
  userid_list?: string;
  dept_id_list?: string;
  to_all_user?: boolean;
  msg: {
    msgtype: string;
  }
}
