import { post } from '@utils/request';
// 获取初级实操列表
export const operateList = (
  params: any
): Promise<API.ResponseData<any>> => post('/operateList', params);

// 新增实操
export const addOperate = (
  params: any
): Promise<API.ResponseData<any>> => post('/addOperate', params);

// 编辑实操
export const editOperate = (
  params: any
): Promise<API.ResponseData<any>> => post('/editOperate', params);

// 删除实操
export const deleteOperate = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteOperate', params);
