import request from '@/utils/request'

export const userApi = {
  Token: '/auth/oauth2/token',
  Logout: '/auth/oauth2/logout',
  SsoOut: '/auth/logout',
  UserInfo: '/admin/v1/users/profile',
  Captcha: '/auth/v1/captchas/',
  Tenant: '/auth/oauth2/tenant',
  SecretInfo: '/auth/v1/secrets',
  IdempotentToken: '/auth/oauth2/idempotent_token'
}

/**
 * login func
 * @param params
 * @returns {*}
 */
export function login (params) {
  return request({
    url: userApi.Token,
    method: 'post',
    data: params,
    // 设置序列化请求函数
    transformRequest: (data = {}) => Object.entries(data).map(ent => ent.join('=')).join('&'),
    headers: {
      'Authorization': 'Basic OTVUeFNzVFBGQTN0RjEyVEJTTW1VVkswZGE6RnBId0lmdzR3WTkyZE8=',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}

export function ssoOut () {
  return request({
    url: userApi.SsoOut,
    method: 'get'
  })
}

export function tenant () {
  return request({
    url: userApi.Tenant,
    method: 'get'
  })
}

export function captcha (uuid) {
  return request({
    url: userApi.Captcha + uuid,
    method: 'get'
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout (token) {
  return request({
    url: userApi.Logout,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token
    }
  })
}

export function secretInfo () {
  return request({
    url: userApi.SecretInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function idempotentToken () {
  return request({
    url: userApi.IdempotentToken,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
