import { post } from '@utils/request';

export const queryUserLists = (
  params: any
): Promise<API.ResponseData<any>> => post('/user/list', params);

// 随机真题
export const getTrueTopicsRandomly = (
  params: any
): Promise<API.ResponseData<any>> => post('/getTrueTopicsRandomly', params);

// 随机模拟
export const getSimulationRandomly = (
  params: any
): Promise<API.ResponseData<any>> => post('/getSimulationRandomly', params);

// 随机密卷
export const getDenseVolumeRandomly = (
  params: any
): Promise<API.ResponseData<any>> => post('/getDenseVolumeRandomly', params);