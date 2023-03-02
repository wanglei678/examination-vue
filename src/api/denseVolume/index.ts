import { post } from '@utils/request';
// 获取模拟列表
export const denseVolumeList = (
  params: any
): Promise<API.ResponseData<any>> => post('/denseVolumeList', params);

// 添加模拟
export const addDenseVolume = (
  params: any
): Promise<API.ResponseData<any>> => post('/addDenseVolume', params);

// 编辑模拟名称
export const editDenseVolumeName = (
  params: any
): Promise<API.ResponseData<any>> => post('/editDenseVolumeName', params);

// 删除模拟及模拟下的所有题目
export const deleteDenseVolumesAndQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteDenseVolumesAndQuestion', params);

// 获取模拟下的题目
export const queryDenseVolumeQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/queryDenseVolumeQuestions', params);

// 编辑模拟单个题目
export const editDenseVolumesQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/editDenseVolumesQuestion', params);

// 删除单个题目
export const deleteDenseVolumesQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteDenseVolumesQuestion', params);

// 批量导入题目
export const addDenseVolumesQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/addDenseVolumesQuestions', params);