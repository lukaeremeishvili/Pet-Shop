export interface IBaseResponse {
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: string;
  _uuid: string;
}

export interface IGetAllResponse<T extends object> {
  items: T[];
}

// export interface IWithUuid {
//   _uuid: string;
// }
