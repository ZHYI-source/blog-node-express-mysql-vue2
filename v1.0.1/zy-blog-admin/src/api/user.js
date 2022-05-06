import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/zy-server/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/zy-server/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/zy-server/admin/logout',
    method: 'post'
  })
}
