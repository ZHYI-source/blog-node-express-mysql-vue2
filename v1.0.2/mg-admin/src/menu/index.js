import {uniqueId} from 'lodash'
import {dirMenusList} from "@/api/modules/sys.menus.api";
import Tools from "@/libs/utils.tool";
import util from "@/libs/util";
import {dirRolesList, dirRolesOne} from "@/api/modules/sys.roles.api";
import {listen} from "@/libs/utils.listen";

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

function listToTree(list) {
  let map = {}, node, tree = [], i;
  for (i = 0; i < list.length; i++) {
    map[list[i].id] = list[i];
    list[i].children = [];
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pid !== 1) {
      map[node.pid].children.push(node);
    } else {
      tree.push(node);
    }
  }
  return tree;
}

//搜索条件展示
export const menuHeader = supplementPath([
  {path: '/index', title: '首页', icon: 'home'},
  {
    title: '客户端管理',
    icon: 'th-large',
    path: '/dir-article-info',
    children: [
      {path: '/dir-article-info', icon: 'th-large', title: '博文管理',},
      {path: '/dir-sort-info', icon: 'th-large', title: '分类管理'},
      {path: '/dir-tags-info', icon: 'th-large', title: '标签管理'},
      {path: '/dir-friends-info', icon: 'th-large', title: '友链管理'},
      {path: '/dir-website-info', icon: 'th-large', title: '站点管理'},
      {path: '/dir-about-info', icon: 'th-large', title: '博主管理'},
      {path: '/dir-message-info', icon: 'th-large', title: '留言管理'},
      {path: '/dir-comments-info', icon: 'th-large', title: '评论管理'},
      {path: '/dir-socials-info', icon: 'th-large', title: '社交管理'},
    ]
  },
  {
    title: '系统管理',
    icon: 'th-large',
    path: '/code/dir-code-info',
    children: [
      {path: '/code/dir-code-info', icon: 'th-large', title: '代码生成'},
      {path: '/users/dir-users-info', icon: 'th-large', title: '用户管理'},
      {path: '/roles/dir-roles-info', icon: 'th-large', title: '角色管理'},
      {path: '/menus/dir-menus-info', icon: 'th-large', title: '菜单管理'},
    ]
  },
  {
    icon: 'asterisk',
    title: '图标列表',
    path: '/icon/list',
    children: []
  }
])

export const menuAside = function (menus) {
  return new Promise((resolve, reject) => {
    let menuArr = []
    let datas = menus || []
    for (const data of datas) {
      //时间格式化
      data.createdAt = data.createdAt && Tools.fmtLong2DateTime(data.createdAt)
      data.updatedAt = data.updatedAt && Tools.fmtLong2DateTime(data.updatedAt)
    }
    menuArr = listToTree(datas);
    resolve(supplementPath(menuArr))
  })

}

function fillterMenus(_this, arr, isRoot) {
  //过滤三级菜单
  let noThreeMenus = [], permMenus = []
  arr.filter(ele => {
    if (ele.lever !== 3) {
      noThreeMenus.push(ele)
    } else {
      if (isRoot) {
        permMenus = ['*']
      } else {
        permMenus.push(ele.authority)
      }
    }
  })
  util.cookies.set('permMenus', JSON.stringify(permMenus))
  //设置权限
  _this.$store.commit('d2admin/perms/setPermsArr', permMenus)
  menuAside(noThreeMenus).then(menus => {
    //设置菜单
    _this.$store.commit('d2admin/menu/asideSet', menus)
  })
}

export const setAsideMenu = (_this) => {
  let roleId = util.cookies.get('roleId')
  if (roleId) {
    // 获取角色
    dirRolesOne({params: {id: roleId}}).then(role => {
      let roleId = role.id
      //存储角色信息
      util.cookies.set('roleId', roleId)
      let menu = role.menus

      //超级管理员
      if (role.role_name === 'admin') {
        dirMenusList().then(allMenus => {
          fillterMenus(_this, allMenus.data, true)
        })
      } else {
        //排序
        menu.sort(function (a, b) { // 这是比较函数
          return a.id - b.id;    // 升序  0+
        })
        fillterMenus(_this, menu)
      }
    })
  }
}


