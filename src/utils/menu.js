module.exports = [
  {
    key: 'dashboard',
    name: '面板',
    icon: 'laptop',
  },
  {
    key: 'blogs',
    name: '博客',
    icon: 'switcher',
  },
  {
    key: 'works',
    name: '作品',
    icon: 'book',
  },
  {
    key: 'user',
    name: '个人信息',
    icon: 'user',
    clickable: false,
    child: [
      {
        key: 'alterPwd',
        name: '修改密码',
        icon: 'lock',
      },
      {
        key: 'dataTable',
        name: 'DataTable',
        icon: 'database',
      },
      {
        key: 'dropOption',
        name: 'DropOption',
        icon: 'bars',
      },
      {
        key: 'search',
        name: 'Search',
        icon: 'search',
      },
      {
        key: 'editor',
        name: 'Editor',
        icon: 'edit',
      },
      {
        key: 'layer',
        name: 'layer (Function)',
        icon: 'credit-card',
      },
    ],
  }
]
