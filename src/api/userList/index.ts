import { post } from '@utils/request';

export const queryUserLists = (
  params: any
): Promise<API.ResponseData<any>> => post('/user/list', params);