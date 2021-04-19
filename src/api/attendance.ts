import { Client } from "../client";
import { Base } from "../base";

type GetColumnValOptions = {
  userid: string;
  to_date: string;
  from_date: string;
  column_id_list: string;
}

type ColumnVal = {
  fixed_value?: string;
  column_vals: {
    date: Date;
    value: string;
  }[];
  column_vo: {
    id: string;
  }
}


/*
 * 考勤 API
 * @type {User}
 */
export class Attendance extends Base {
  protected readonly uri = "topapi/attendance";

  constructor(client: Client) {
    super(client);
  }

  /*
   * 获取考勤报表列值
   */
  async getColumnVal(options: GetColumnValOptions) {
    return this.post<{ column_vals: ColumnVal[] }>("getcolumnval", options);
  }
}
