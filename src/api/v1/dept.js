import request from '@/utils/request'

// 查询部门列表
export function listDept (data) {
  return request({
    url: '/admin/v1/depts/list',
    method: 'post',
    data: data
  })
}

// 查询部门详细
export function getDeptById (id) {
  return request({
    url: '/admin/v1/depts/' + id,
    method: 'get'
  })
}

// 新增部门
export function insertDept (data, token) {
  return request({
    url: '/admin/v1/depts',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'request-id': token
    }
  })
}

// 修改部门
export function updateDept (data) {
  return request({
    url: '/admin/v1/depts',
    method: 'put',
    data: data
  })
}

// 删除部门
export function deleteDeptById (id) {
  return request({
    url: '/admin/v1/depts' + '/' + id,
    method: 'delete'
  })
}

// 根据角色ID查询部门IDS
export function listRoleDeptIDS (roleId) {
  return request({
    url: '/admin/v1/depts/' + roleId + '/ids',
    method: 'get'
  })
}

// 查询树形下拉部门列表
export function listDeptTree () {
  return request({
    url: '/admin/v1/depts/tree',
    method: 'get'
  })
}
