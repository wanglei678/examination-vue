import { post } from '@utils/request';

export const addUsers = (
  params: any
): Promise<API.ResponseData<any>> => post('/addUser', params);