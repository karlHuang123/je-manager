import request from '@/utils/request'

export async function getCareersList(query) {
  return request({
    url: `/college/careers/list?department=${query.department}&category=${query.category}`,
    method: 'get',
  })
}

export async function saveCareer(data) {
  return request({
    url: '/college/careers/save',
    method: 'post',
    data: data,
  })
}

export async function deleteCareer(data) {
  return request({
    url: '/college/careers/delete',
    method: 'post',
    data: data,
  })
}

export async function getDataBaseQaList(department) {
  return request({
    url: `/college/database/qa/list?department=${department}`,
    method: 'get',
  })
}

export async function saveDataBaseQa(data) {
  return request({
    url: '/college/database/qa/save',
    method: 'post',
    data: data,
  })
}

export async function deleteDataBaseQa(data) {
  return request({
    url: '/college/database/qa/delete',
    method: 'post',
    data: data,
  })
}

export async function getRaiseList(body) {
  return request({
    url: `/college/database/raise/list?department=${body.department}&discipline=${body.discipline}`,
    method: 'get',
  })
}

export async function saveRaise(data) {
  return request({
    url: '/college/database/raise/save',
    method: 'post',
    data: data,
  })
}

export async function deleteRaise(data) {
  return request({
    url: '/college/database/raise/delete',
    method: 'post',
    data: data,
  })
}

export async function getDisciplineList(department) {
  return request({
    url: `/college/course-detail/discipline/list?department=${department}`,
    method: 'get',
  })
}

export async function saveDiscipline(data) {
  return request({
    url: '/college/course-detail/discipline/save',
    method: 'post',
    data: data,
  })
}

export async function deleteDiscipline(data) {
  return request({
    url: '/college/course-detail/discipline/delete',
    method: 'post',
    data: data,
  })
}

export async function getDisciplineIntro(body) {
  return request({
    url: `/college/course-detail/discipline-intro/get?department=${body.department}&discipline=${body.discipline}`,
    method: 'get',
  })
}

export async function saveDisciplineIntro(data) {
  return request({
    url: '/college/course-detail/discipline-intro/save',
    method: 'post',
    data: data,
  })
}

export async function getCourseStructure(body) {
  return request({
    url: `/college/course-detail/course-structure/get?department=${body.department}&discipline=${body.discipline}`,
    method: 'get',
  })
}

export async function saveCourseStructure(data) {
  return request({
    url: '/college/course-detail/course-structure/save',
    method: 'post',
    data: data,
  })
}

export async function getCourseContent(body) {
  return request({
    url: `/college/course-detail/course-content/get?department=${body.department}&discipline=${body.discipline}&subject=${body.subject}`,
    method: 'get',
  })
}

export async function saveCourseContent(data) {
  return request({
    url: '/college/course-detail/course-content/save',
    method: 'post',
    data: data,
  })
}

export async function getOnlineList(body) {
  return request({
    url: `/college/course-detail/online-experience/list?department=${body.department}&discipline=${body.discipline}`,
    method: 'get',
  })
}

export async function saveOnlineList(data) {
  return request({
    url: '/college/course-detail/online-experience/save',
    method: 'post',
    data: data,
  })
}

export async function getTags(department) {
  return request({
    url: `/college/intro/member/tag/list?department=${department}`,
    method: 'get',
  })
}

export async function saveTag(data) {
  return request({
    url: '/college/intro/member/tag/save',
    method: 'post',
    data: data,
  })
}

export async function deleteTag(data) {
  return request({
    url: '/college/intro/member/tag/delete',
    method: 'post',
    data: data,
  })
}
