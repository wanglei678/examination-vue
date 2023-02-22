import { post } from '@utils/request';
// 获取章节列表
export const querychaptersList = (
  params: any
): Promise<API.ResponseData<any>> => post('/chaptersList', params);

// 添加章节
export const addChapter = (
  params: any
): Promise<API.ResponseData<any>> => post('/addChapter', params);

// 编辑章节名称
export const editChapterName = (
  params: any
): Promise<API.ResponseData<any>> => post('/editChapterName', params);

// 删除章节及章节下的所有题目
export const deleteChapterAndQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteChapterAndQuestion', params);

// 获取章节下的题目
export const queryChapterQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/queryChapterQuestions', params);
// 获取章节下的基础知识题目
export const queryBaseQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/queryBaseQuestions', params);

// 编辑单个题目
export const editQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/editQuestion', params);

// 删除单个题目
export const delQuestion = (
  params: any
): Promise<API.ResponseData<any>> => post('/deleteQuestion', params);

// 批量导入题目
export const addQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/addQuestions', params);
// 批量导入基础题目
export const addBaseQuestions = (
  params: any
): Promise<API.ResponseData<any>> => post('/addBaseChapterQuestions', params);
