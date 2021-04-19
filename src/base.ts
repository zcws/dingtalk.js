import { Client } from "./client";

type Result<T> = {
  errmsg: string;
  errcode: string;
  request_id: string;
  result?: T;
  success?: T;
  process_instance?: T
};

export abstract class Base {
  protected readonly uri: string;

  protected constructor(private readonly client: Client) {
  }

  protected async post<T>(api: string, body: { [k: string]: unknown }): Promise<T> {
    const res = await this.client.post<Result<T>>(`${this.uri}/${api}`, body);
    if (res.errcode) {
      throw new Error(res.errmsg);
    } else if (res.result) {
      return res.result;
    } else if (res.success) {
      return res.success;
    } else if (res.process_instance) {
      return res.process_instance;
    }
  }
}
