import { post } from '@utils/request';
// 获取真题列表
export const querytrueTopicList = (
  params: any
): Promise<API.ResponseData<any>> => post('/trueTopicList', params);

// 添加真题
export const addTrueTopic = (
  params: any
): Promise<API.ResponseData<any>> => post('/addTrueTopic', params);

// 编辑真题名称
export const editTrueTopicName = (
  params: any
): Promise<API.ResponseData<any>> => post('/editTrueTopicName', params);

// 删除真题及真题下的所有题目
export const deleteTrueTopicsAndQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteTrueTopicsAndQuestion', params);

// 获取真题下的题目
export const queryTrueTopicQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/queryTrueTopicQuestions', params);

// 编辑真题单个题目
export const editTrueTopicsQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/editTrueTopicsQuestion', params);

// 删除单个题目
export const deleteTrueTopicsQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteTrueTopicsQuestion', params);

// 批量导入题目
export const addTrueTopicsQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/addTrueTopicsQuestions', params);