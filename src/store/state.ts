import { reactive } from 'vue';

export interface State {
  vehicleType: API.VehiclesModelsItem[];
  menuList: API.MenusItem[];
  perm: API.MenusItem[];
  menuIndexCode: string;
}

export const state: State = {
  vehicleType: [],
  menuList: [],
  perm: [],
  menuIndexCode: ''
};

export function createState() {
  return reactive(state);
}
