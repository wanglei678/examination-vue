import { State } from './state';

function setVehicleType(state: State) {
  return (vehicleType: API.VehiclesModelsItem[]) => {
    state.vehicleType = vehicleType;
  };
}

function setMenuList(state: State) {
  return (menuList: API.MenusItem[]) => {
    state.menuList = menuList;
  };
}

function setMenuIndexCode(state: State) {
  return (menuIndexCode: string) => {
    state.menuIndexCode = menuIndexCode;
  };
}

function setPerm(state: State) {
  return (perm: API.MenusItem[]) => {
    state.perm = perm;
  };
}

export function createAction(state: State) {
  return {
    setVehicleType: setVehicleType(state),
    setMenuList: setMenuList(state),
    setMenuIndexCode: setMenuIndexCode(state),
    setPerm: setPerm(state)
  };
}
