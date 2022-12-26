// @ts-ignore
/* eslint-disable */

import { ElTableColumn } from 'element-plus';

declare namespace Layout {
  enum FormParamsType {
    enum = 'enum',
    text = 'text',
    number = 'number',
    date = 'date',
    daterange = 'daterange',
    switch = 'switch',
    checkbox = 'checkbox',
    email = 'email',
    textarea = 'textarea',
    radioGroup = 'radioGroup'
  }

  type FormOptionsItemCheckList = { label: string | number; disabled?: boolean; text?: string }[];
  type FormOptionsItemSelectOptions = { value: any; label: string | number; disabled?: boolean }[];

  type FormOptionsItem = {
    label: string;
    prop: string;
    rules?: any;
    type?: keyof typeof FormParamsType;
    maxLength?: number;
    required?: boolean;
    defaultValue?: any;
    disabled?: boolean;
    selectOptions?: FormOptionsItemSelectOptions;
    checkList?: FormOptionsItemCheckList;
    placeholder?: string;
    hide?: boolean;
    filterable?: boolean;
    disabledDate?: Function;
  };

  type ProTableOptions = {
    searchOptions?: SearchOptions;
    columns: columnsItem[];
    request: (params: any) => Promise<any>;
    hasPagination?: boolean; // 该参数如为false，则不会做分页请求
    query?: { [k: string]: any }; // 有该参数时，会使用该参数进行初次搜索
    daterangeKey?: string[]; // [开始时间的key名,结束时间key名]
  };

  type TableOptions<T> = {
    columns: columnsItem[];
    data: T;
    loading: boolean;
  };

  type columnsItem = {
    width?: number | string;
    label: string;
    prop?: string;
    slot?: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    type?: 'selection' | 'index' | 'expand';
    formatter?: ((row: any, column: any, cellValue: any, index: number) => any) | undefined;
  };

  type SearchOptions = {
    params?: Params;
    hasAdd?: boolean;
    addText?: string;
    searchBtnText?: string;
  };

  type Params = {
    name: string;
    type: keyof typeof ParamsType;
    placeholder?: string;
    width?: number;
    maxLength?: number;
    selectOptions?: { value: any; label: string | number; disabled?: boolean }[];
    defaultValue?: any;
    clearable?: boolean;
  }[];

  enum ParamsType {
    enum = 'enum',
    text = 'text',
    number = 'number',
    date = 'date',
    daterange = 'daterange',
    radioGroup = 'radioGroup',
    channelSelect = 'channelSelect',
    vehicleTypeSelect = 'vehicleTypeSelect',
    changeLogOperTypeSelect = 'changeLogOperTypeSelect',
    changeLogChannelTypeSelect = 'changeLogChannelTypeSelect',
    ErrorCodeCategoryTypeSelect = 'ErrorCodeCategoryTypeSelect'
  }
}
