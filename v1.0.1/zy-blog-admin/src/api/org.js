import request from '@/utils/request'

export function listOrg(query) {
  return request({
    url: '/taxi-server/org/select',
    method: 'post',
    params: query
  })
}

export function orgTree(data) {
  return request({
    url: '/taxi-server/org/tree',
    method: 'post',
    data
  })
}

export function readminAdmin(data) {
  return request({
    url: '/taxi-server/admin/admin/readmin',
    method: 'get',
    data
  })
}

export function updateAdmin(data) {
  return request({
    url: '/taxi-server/admin/admin/update',
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/taxi-server/admin/admin/delete',
    method: 'post',
    data
  })
}
