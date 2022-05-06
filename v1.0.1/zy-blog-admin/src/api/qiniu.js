import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/taxi-file/fileserver/upload/v2', // 假地址 自行替换
    method: 'post'
  })
}
