import { post } from '@utils/request';
// 获取密卷列表
export const simulationList = (
  params: any
): Promise<API.ResponseData<any>> => post('/simulationList', params);

// 添加密卷
export const addSimulation = (
  params: any
): Promise<API.ResponseData<any>> => post('/addSimulation', params);

// 编辑密卷名称
export const editSimulationName = (
  params: any
): Promise<API.ResponseData<any>> => post('/editSimulationName', params);

// 删除密卷及密卷下的所有题目
export const deleteSimulationsAndQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteSimulationsAndQuestion', params);

// 获取密卷下的题目
export const querySimulationQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/querySimulationQuestions', params);

// 编辑密卷单个题目
export const editSimulationsQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/editSimulationsQuestion', params);

// 删除单个题目
export const deleteSimulationsQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteSimulationsQuestion', params);

// 批量导入题目
export const addSimulationsQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/addSimulationsQuestions', params);