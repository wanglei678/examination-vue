// 全局枚举值
// 作用域枚举值请在对应的最小作用域内创建enum文件

// 主题色
export enum ThemeEnum {
  default = 'default',
  bronzeGreen = 'bronzeGreen',
  red = 'red',
  black = 'black'
}

export const themeMap: { [k in ThemeEnum]: { text: string; color: string; className: string } } = {
  [ThemeEnum.default]: {
    text: '深空蓝',
    color: '#205aa4',
    className: 'default'
  },
  [ThemeEnum.bronzeGreen]: {
    text: '青铜绿',
    color: '#00b4aa',
    className: 'bronze-green'
  },
  [ThemeEnum.red]: {
    text: '炫彩绿',
    color: '#000000',
    className: 'reds'
  },
  [ThemeEnum.black]: {
    text: '复古灰',
    color: '#000000',
    className: 'blacks'
  },
};

// 燃油类型
export enum FuelType {
  all = 'ALL',
  PHEV = 'PHEV',
  BEV = 'BEV'
}
// 燃油类型 selectOptions
export const FuelTypeMap = [
  {
    label: FuelType.all,
    value: ''
  },
  {
    label: FuelType.PHEV,
    value: 'I'
  },
  {
    label: FuelType.BEV,
    value: 'E'
  }
];

// brandCode
export enum BandCodeType {
  F = 'F',
  L = 'L',
  M = 'M'
}
export const BandCodeMap = [
  {
    label: '福特',
    value: BandCodeType.F
  },
  {
    label: '林肯',
    value: BandCodeType.L
  },
  {
    label: 'Mach-E',
    value: BandCodeType.M
  }
];

// 权限类型
export enum PermType {
  MENU = 'MENU',
  OPER = 'OPER',
  ELEMENT = 'ELEMENT'
}

export const PermTypeMap = [
  {
    label: 'MENU',
    value: PermType.MENU
  },
  {
    label: 'OPERATION',
    value: PermType.OPER
  },
  {
    label: 'ELEMENT',
    value: PermType.ELEMENT
  }
];
// 供应商
export const OperatorOptions = [
  {
    label: '特来电',
    value: '395815801'
  },
  // {
  //   label: '安悦充电',
  //   value: 'MA1FP0228'
  // },
  {
    label: '星星充电',
    value: '313744932'
  },
  {
    label: '云快充 Cloud Power',
    value: 'MA1MY0GF9'
  },
  {
    label: '国家电网',
    value: 'MA002TMQX'
  },
  {
    label: '南方电网',
    value: 'MA5DT8Q54'
  },
  {
    label: '依威能源',
    value: '320513112'
  },
  {
    label: '小桔充电',
    value: '101437000'
  },
  {
    label: '蔚来能源',
    value: 'MA4KUHJ97'
  },
  {
    label: '森通智达',
    value: '088669285'
  },
  {
    label: '万城万充',
    value: 'MA59J8YL8'
  },
  {
    label: '其他品牌',
    value: '0'
  }
];
