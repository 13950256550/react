const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{
      name: '分析页',
      path: 'analysis',
    }],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [{
      name: '基础表单',
      path: 'basic-form',
    }, {
      name: '分步表单',
      path: 'step-form',
    }, {
      name: '高级表单',
      path: 'advanced-form',
    }],
  },
  {
    name: '测试子系统',
    icon: 'form',
    path: 'test-subsystem',
    children: [{
      name: '测试模块',
      path: 'test-module',
    }],
  },
];

export function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);
