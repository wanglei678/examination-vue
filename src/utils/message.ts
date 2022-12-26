import { ElMessage, IMessageOptions } from 'element-plus';

// 统一设置
const baseOptions = {
  duration: 2000
};

export const showInfo = (message: string, options?: IMessageOptions) => {
  ElMessage({
    message,
    ...options,
    ...baseOptions
  });
};

export const showSuccess = (message: string, options?: IMessageOptions) => {
  ElMessage({
    message,
    type: 'success',
    ...options,
    ...baseOptions
  });
};

export const showWarning = (message: string, options?: IMessageOptions) => {
  ElMessage({
    message,
    type: 'warning',
    ...options,
    ...baseOptions
  });
};

export const showError = (message: unknown, options?: IMessageOptions) => {
  if (typeof message === 'string') {
    ElMessage({
      message,
      type: 'error',
      ...options,
      ...baseOptions
    });
  } else {
    throw message;
  }
};

// 手动关闭
export const closeMessage = () => {
  ElMessage.closeAll();
};
