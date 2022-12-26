import { ElLoading, ILoadingOptions, ILoadingInstance } from 'element-plus';

const baseOptings: ILoadingOptions = {};

let loadingInstance: ILoadingInstance;

export const showLoading = (optings?: ILoadingOptions) => {
  loadingInstance = ElLoading.service({
    ...baseOptings,
    ...optings
  });
};

export const closeLoading = () => {
  loadingInstance.close();
};
