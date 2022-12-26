import { post } from '@utils/request';

export const deleteUser = (
  params: any
): Promise<API.ResponseData<any>> => post('/delete/user', params);