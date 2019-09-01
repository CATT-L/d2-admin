import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/system/login',
    method: 'post',
    data
  })
}
