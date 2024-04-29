import request from '@/utils/request'

export async function uploadFile(data) {
  return request({
    url: '/upload',
    method: 'post',
    data: data,
  })
}

export function saveCarousel(data) {
  return request({
    url: '/home/carousel/save',
    method: 'post',
    data,
  })
}

export function deleteCarousel(data) {
  return request({
    url: '/home/carousel/delete',
    method: 'post',
    data,
  })
}

export function getCarousel() {
  return request({
    url: '/home/carousel/list',
    method: 'get',
  })
}
