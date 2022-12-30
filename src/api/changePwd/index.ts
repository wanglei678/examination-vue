import { post } from '@utils/request';
// 修改密码
export const changePwd = (
  params: any
): Promise<API.ResponseData<any>> => post('/changePwd', params);