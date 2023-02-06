import request from '@/utils/request'

// 查询数据源列表
export function listSource (query) {
  return request({
    url: '/admin/sys/source/api/query',
    method: 'post',
    data: query
  })
}

// // 查询数据源
// export function getSource (userId) {
//   return request({
//     url: '/admin/sys/user/api/detail?id=' + parseStrEmpty(userId),
//     method: 'get'
//   })
// }

// 新增数据源
export function addSource (data) {
  return request({
    url: '/admin/sys/source/api/insert',
    method: 'post',
    data: data
  })
}
//
// // 修改数据源
// export function updateUser (data) {
//   return request({
//     url: '/admin/sys/user/api/update',
//     method: 'put',
//     data: data
//   })
// }
//
// 删除数据源
export function delSource (userId) {
  return request({
    url: '/admin/sys/source/api/delete?id=' + userId,
    method: 'delete'
  })
}
