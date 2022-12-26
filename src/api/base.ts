// 获取菜单
export const getMenus = () => {
  let menuData: any = [
    {
      code: 'user',
      displayName: '用户管理',
      id: 1
    },
    {
      code: 'videos',
      displayName: '视频管理',
      id: 2
    },
    {
      displayName: '题库管理',
      id: 3,
      children: [
        {
          code: 'questionsEasy',
          displayName: '初级题库',
          id: 4
        },
        {
          code: 'questionsMiddle',
          displayName: '中级题库',
          id: 5
        },
        {
          code: 'questionsHard',
          displayName: '高级题库',
          id: 6
        },
      ]
    }
  ];
  return menuData;
};
