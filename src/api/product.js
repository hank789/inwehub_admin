import request from '@/utils/request'

/**
 * 专家观点列表
 * @param query
 */
export function fetchIdeaList(query) {
  return request({
    url: '/product/ideaList',
    method: 'post',
    params: query
  })
}

/**
 * 获取产品信息
 */
export function fetchInfo() {
  return request({
    url: '/manage/product/getInfo',
    method: 'get',
    params: {}
  })
}

