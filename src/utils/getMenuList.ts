import { getMenus } from '@api/base';
import { useStore } from '@store/index';
import { showError } from './message';
import _ from 'lodash';

const menusFilter = (menus: API.MenusItem[]) => {
  return menus
    .filter((item) => item.type === 'MENU')
    .map((item) => {
      if (item.children) {
        item.children = menusFilter(item.children);
      }
      return item;
    });
};

const getMenuList = async () => {
  const { state, action } = useStore();
  const list = state.menuList;
  if (list.length > 0) {
    return list;
  } else {
    try {
      const res = getMenus();
      return res.data || [];
    } catch (error) {
      showError(error);
    }
  }
};

export default getMenuList;
