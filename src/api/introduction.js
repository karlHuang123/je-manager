import request from '@/utils/request'

export function getMemberList(data) {
  return request({
    url: `/college/intro/member/list`,
    method: 'post',
    data,
  })
}

export function saveMember(data) {
  return request({
    url: '/college/intro/member/save',
    method: 'post',
    data,
  })
}

export function deleteMember(data) {
  return request({
    url: '/college/intro/member/delete',
    method: 'post',
    data,
  })
}

export function getLifeList(department) {
  return request({
    url: `/college/intro/life/list?department=${department}`,
    method: 'get',
  })
}

export function saveLife(data) {
  return request({
    url: '/college/intro/life/save',
    method: 'post',
    data,
  })
}

export function deleteLife(data) {
  return request({
    url: '/college/intro/life/delete',
    method: 'post',
    data,
  })
}

export function getQualifyScoreList(department) {
  return request({
    url: `/college/intro/qualified-score/list?department=${department}`,
    method: 'get',
  })
}

export function saveQualifyScore(data) {
  return request({
    url: '/college/intro/qualified-score/save',
    method: 'post',
    data,
  })
}

export function deleteQualifyScore(data) {
  return request({
    url: '/college/intro/qualified-score/delete',
    method: 'post',
    data,
  })
}

export function getQualifyCaseList(department, tag = []) {
  return request({
    url: `/college/intro/qualified-case/list?department=${department}&tag=${tag}`,
    method: 'get',
  })
}

export function saveQualifyCase(data) {
  return request({
    url: '/college/intro/qualified-case/save',
    method: 'post',
    data,
  })
}

export function deleteQualifyCase(data) {
  return request({
    url: '/college/intro/qualified-case/delete',
    method: 'post',
    data,
  })
}
