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
      code: 'asdasd',
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
        }
      ]
    },
    {
      displayName: '实操管理',
      code: 'sadasd',
      id: 7,
      children: [
        {
          code: 'easyOperate',
          displayName: '初级实操',
          id: 8
        },
        {
          code: 'middleMonitorOperate',
          displayName: '中级监控实操',
          id: 9
        },
        {
          code: 'middleMaintenanceOperate',
          displayName: '中级维保实操',
          id: 10
        }
      ]
    }
  ];
  return menuData;
};
