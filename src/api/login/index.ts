import { post } from '@utils/request';

export const login = (
  params: any
): Promise<API.ResponseData<any>> => post('/apis/login', params);

export const sendMail = (): Promise<API.ResponseData<any>> => post('/sendMail');