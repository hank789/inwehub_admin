import request from '@/utils/request'

/**
 * 产品专家观点列表
 */
export function ideaList(query) {
  return request({
    url: '/manage/product/ideaList',
    method: 'post',
    data: query
  })
}
/**
 * 产品内容源列表
 */
export function sourceList(query) {
  return request({
    url: '/manage/product/sourceList',
    method: 'post',
    data: query
  })
}
/**
 * 产品案例列表
 */
export function caseList(query) {
  return request({
    url: '/manage/product/caseList',
    method: 'post',
    data: query
  })
}
/**
 * 产品资讯列表
 */
export function newsList(query) {
  return request({
    url: '/manage/product/newsList',
    method: 'post',
    data: query
  })
}
/**
 * 删除产品亮点图
 */
export function deleteIntroducePic(query) {
  return request({
    url: '/manage/product/deleteIntroducePic',
    method: 'post',
    data: query
  })
}
/**
 * 删除内容源
 */
export function delSource(query) {
  return request({
    url: '/manage/product/delSource',
    method: 'post',
    data: query
  })
}
/**
 * 排序专家观点
 */
export function sortIdea(query) {
  return request({
    url: '/manage/product/sortIdea',
    method: 'post',
    data: query
  })
}
/**
 * 排序产品亮点图
 */
export function sortIntroducePic(query) {
  return request({
    url: '/manage/product/sortIntroducePic',
    method: 'post',
    data: query
  })
}
/**
 * 排序产品案例
 */
export function sortCase(query) {
  return request({
    url: '/manage/product/sortCase',
    method: 'post',
    data: query
  })
}
/**
 * 显示|隐藏|删除案例
 */
export function updateCaseStatus(query) {
  return request({
    url: '/manage/product/updateCaseStatus',
    method: 'post',
    data: query
  })
}
/**
 * 显示|隐藏|删除观点
 */
export function updateIdeaStatus(query) {
  return request({
    url: '/manage/product/updateIdeaStatus',
    method: 'post',
    data: query
  })
}
/**
 * 显示|隐藏|删除资讯
 */
export function updateNewsStatus(query) {
  return request({
    url: '/manage/product/updateNewsStatus',
    method: 'post',
    data: query
  })
}
/**
 * 更新专家观点
 */
export function updateIdea(query) {
  return request({
    url: '/manage/product/updateIdea',
    method: 'post',
    data: query
  })
}
/**
 * 更新产品亮点图
 */
export function updateIntroducePic(query) {
  return request({
    url: '/manage/product/updateIntroducePic',
    method: 'post',
    data: query
  })
}
/**
 * 更新产品信息
 */
export function updateInfo(query) {
  return request({
    url: '/manage/product/updateInfo',
    method: 'post',
    data: query
  })
}
/**
 * 更新案例
 */
export function updateCase(query) {
  return request({
    url: '/manage/product/updateCase',
    method: 'post',
    data: query
  })
}
/**
 * 添加专家观点
 */
export function storeIdea(query) {
  return request({
    url: '/manage/product/storeIdea',
    method: 'post',
    data: query
  })
}
/**
 * 添加内容源
 */
export function storeSource(query) {
  return request({
    url: '/manage/product/storeSource',
    method: 'post',
    data: query
  })
}
/**
 * 添加案例
 */
export function storeCase(query) {
  return request({
    url: '/manage/product/storeCase',
    method: 'post',
    data: query
  })
}
/**
 * 添加资讯
 */
export function storeNews(query) {
  return request({
    url: '/manage/product/storeNews',
    method: 'post',
    data: query
  })
}
/**
 * 获取url标题
 */
export function fetchUrlInfo(query) {
  return request({
    url: '/manage/product/fetchUrlInfo',
    method: 'post',
    data: query
  })
}
/**
 * 获取产品亮点图
 */
export function getIntroducePic(query) {
  return request({
    url: '/manage/product/getIntroducePic',
    method: 'get',
    params: query
  })
}
/**
 * 获取产品信息
 */
export function getInfo(query) {
  return request({
    url: '/manage/product/getInfo',
    method: 'get',
    params: query
  })
}
/**
 * 获取产品浏览统计信息
 */
export function getViewData(query) {
  return request({
    url: '/manage/product/getViewData',
    method: 'get',
    params: query
  })
}
/**
 * 获取源信息
 */
export function fetchSourceInfo(query) {
  return request({
    url: '/manage/product/fetchSourceInfo',
    method: 'post',
    data: query
  })
}
