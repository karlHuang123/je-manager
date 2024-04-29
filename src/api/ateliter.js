import request from '@/utils/request'

export async function getNewsList() {
  return request({
    url: '/studio/news/list',
    method: 'get',
  })
}

export async function saveNews(data) {
  return request({
    url: '/studio/news/save',
    method: 'post',
    data: data,
  })
}

export async function deleteNews(data) {
  return request({
    url: '/studio/news/delete',
    method: 'post',
    data: data,
  })
}

export async function getWorksList(category) {
  return request({
    url: `/studio/works/list?category=${category}`,
    method: 'get',
  })
}

export async function saveWorks(data) {
  return request({
    url: '/studio/works/save',
    method: 'post',
    data: data,
  })
}

export async function deleteWorks(data) {
  return request({
    url: '/studio/works/delete',
    method: 'post',
    data: data,
  })
}

export async function getDesignerList() {
  return request({
    url: '/studio/designer/list',
    method: 'get',
  })
}

export async function saveDesigner(data) {
  return request({
    url: '/studio/designer/save',
    method: 'post',
    data: data,
  })
}

export async function deleteDesigner(data) {
  return request({
    url: '/studio/designer/delete',
    method: 'post',
    data: data,
  })
}

export async function getRewardList() {
  return request({
    url: '/studio/award/list',
    method: 'get',
  })
}

export async function saveReward(data) {
  return request({
    url: '/studio/award/save',
    method: 'post',
    data: data,
  })
}

export async function deleteReward(data) {
  return request({
    url: '/studio/award/delete',
    method: 'post',
    data: data,
  })
}
