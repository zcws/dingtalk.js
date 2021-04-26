import { Client } from "../client";
import * as assert from "assert";
import { Base } from "../base";

/*
 * 部门相关 API
 * @type {Department}
 */
export class Department extends Base {
  protected readonly uri = 'topapi/v2/department';
  constructor(client: Client) {
    super(client);
  }

  /*
   * 获取部门列表
   *  - department/list
   * @param {Object} [opts] - 其他参数
   * @return {Object} 部门列表 { department: [] }
   */
  async list(opts) {
    return this.client.get("department/list", opts);
  }

  /*
   * 获取部门详情
   *  - department/get
   */
  async get(id: number, language: string = "zh_CN") {
    assert(id, "department id required");
    type Dept = {
      name: string;
      tags: string;
      order: number;
      dept_id: string;
      parent_id: number;
      hide_dept: boolean;
      outer_dept: boolean;
      dept_permits: number[];
      user_permits: string[];
      org_dept_owner: string;
      source_identifier: string;
      dept_group_chat_id: string;
      auto_add_user: boolean;
      from_union_org: boolean;
      create_dept_group: boolean;
      group_contain_sub_dept: boolean;
      dept_manager_userid_list: string[];
      outer_permit_depts: number[];
      outer_permit_users: string[];
    };
    return this.post<Dept>("get", { id, language });
  }

  /*
   * 创建部门
   *  - department/create
   * @param {Object} opts 部门信息, { name, parentId, ... }
   * @return {Object} 操作结果, { id }
   */
  async create(opts) {
    assert(opts.name, "options.name required");
    assert(opts.parentid, "options.parentid required, root is 1");
    return this.client.post("department/create", opts);
  }

  /*
   * 更新部门
   *  - department/update
   * @param {Object} opts 部门信息, { id, ... }
   * @return {Object} 操作结果
   */
  async update(opts) {
    assert(opts.id, "options.id required");
    return this.client.post("department/update", opts);
  }

  /*
   * 删除部门
   *  - department/delete
   * @param {String} id 部门ID
   * @return {Object} 操作结果
   */
  async delete(id) {
    assert(id, "department id required");
    return this.client.get("department/delete", { id });
  }

  /*
   * 获取子部门ID列表
   * @param {String} id 部门ID
   * @param {Object} [opts] client 方法可选参数
   * @return {Object} 操作结果
   */
  async listSubDepartmentIds(id, opts) {
    assert(id, "department id required");
    return this.client.get("department/list_ids", { id }, opts);
  }

  /*
   * 查询部门的所有上级父部门路径
   *  - department/list_parent_depts_by_dept
   * @param {String} id 部门ID
   * @param {Object} [opts] client 方法可选参数
   * @return {Object} 操作结果
   */
  async listParentDepartmentIds(id, opts) {
    assert(id, "department id required");
    return this.client.get("department/list_parent_depts_by_dept", { id }, opts);
  }
}
