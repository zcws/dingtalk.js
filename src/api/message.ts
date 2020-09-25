/*
 * 企业消息相关 API
 * @type {Message}
 */
import * as assert from "assert";
import { Client } from "./client";
import { WorkNoticeOptions } from "../interfaces/message";

export class Message {
  constructor(private client: Client) {
  }

  /*
   * 发送工作通知消息 message/sendWorkNotice
   */
  async sendWorkNotice(opts: WorkNoticeOptions) {
    assert(opts.agent_id, "options.agent_id required");
    assert(opts.userid_list || opts.dept_id_list, "options.userid_list or dept_id_list required");
    assert(opts.msg, "options.msg required");
    return this.client.post("topapi/message/corpconversation/asyncsend_v2", opts);
  }

  /*
   * 获取企业会话消息已读未读状态
   *  - message/list_message_status
   *
   * @param {String} messageId - 消息ID
   * @return {Object} 消息状态 { read: [userid, ...], unread: [] }
   */
  async listMessageStatus(messageId: string) {
    assert(messageId, "messageId required");
    return this.client.post("message/list_message_status", { messageId });
  }
}
