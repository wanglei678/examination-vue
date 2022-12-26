// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResponseData<T> = {
    message: string;
    statusCode: string;
    token: string;
    expiresIn: any;
    data: T;
    totalElements?: number;
    totalPages?: number;
  };
  type MenusItem = {
    children?: MenusItem[];
    code: string;
    displayName?: string;
    id: number;
    parentId?: number;
    sortNum?: number;
    type?: string;
    url?: string;
  };
  type TableParams = {
    page: number;
    pageSize: number;
  };
  type VehiclesModelsItem = {
    brandCode: string;
    commonName: string;
    fuelType: string;
    id: number;
    modelYear: number;
    vehicleModel: string;
  };
}
