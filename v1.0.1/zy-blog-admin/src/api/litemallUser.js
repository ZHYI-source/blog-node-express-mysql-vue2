import request from '@/utils/request'

export function userList(data) {
  return request({
    url: '/user/select',
    method: 'post',
    data
  })
}

export function userInsert(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}

export function userDelete(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
