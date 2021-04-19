import { Client } from "./client";
import { Department } from "./api/department";
import { User } from "./api/user";
import { Message } from "./api/message";
import { Auth } from "./api/auth";
import { Media } from "./api/media";
import { Extcontact } from "./api/extcontact";
import { HRM } from "./api/hrm";
import { Process } from "./api/process";
import { Attendance } from "./api/attendance";

export * from "./interfaces/user";
export * from "./interfaces/message";

export interface IOption {
  host?: string;
  agentId?: string;
  appKey: string;
  appSecret: string;
}

/*
 * 钉钉 SDK
 * @type {DingTalk}
 */
export class DingTalk {
  hrm: HRM;
  user: User;
  auth: Auth;
  media: Media;
  process: Process;
  message: Message;
  attendance: Attendance;
  extcontact: Extcontact;
  department: Department;
  private readonly client: Client;

  constructor(options: IOption) {
    options.host = options.host || "https://oapi.dingtalk.com";
    this.client = new Client(options);
    this.department = new Department(this.client);
    this.user = new User(this.client);
    this.message = new Message(this.client);
    this.media = new Media(this.client, options);
    this.auth = new Auth(this.client);
    this.extcontact = new Extcontact(this.client);
    this.hrm = new HRM(this.client, options);
    this.process = new Process(this.client);
    this.attendance = new Attendance(this.client);
  }
}
