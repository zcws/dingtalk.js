import { Client } from "./client";

type Result<T> = {
  errmsg: string;
  errcode: string;
  success?: boolean;
  request_id: string;
  result?: T;
  process_instance?: T
};

export abstract class Base {
  protected readonly uri: string;

  protected constructor(private readonly client: Client) {
  }

  protected async post<T>(api: string, data): Promise<T> {
    const res = await this.client.post<Result<T>>(`${this.uri}/${api}`, data);
    if (res.errcode) {
      throw new Error(res.errmsg);
    } else if (res.result) {
      return res.result;
    } else if (res.process_instance) {
      return res.process_instance;
    }
  }
}
