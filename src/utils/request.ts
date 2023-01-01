import axios, { AxiosResponse } from 'axios';

const isDve = import.meta.env.DEV;

axios.defaults.baseURL = isDve ? '/ooo' : '/';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const codeMessage: { [k: string]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

axios.interceptors.request.use(
  function (config) {
    if (config?.url?.includes('login') == false) {
      // 获取有效期截至时间
      const expire = localStorage.getItem('expire') || '';
      // 获取当前时间
      // const timestamp = Math.round(new Date().valueOf() / 1000);
      const timestamp = Math.round(new Date().valueOf());
      // 不在有效期内移除token,token有效期暂定四个小时
      if ((Number(expire) + (1000 * 60 * 60 * 4)) <= Number(timestamp)) {
        localStorage.removeItem('expire');
        localStorage.removeItem('token');
        location.href = location.origin + '/#/login';
      } else {
        const token = localStorage.getItem('token') || '';
        if(token) {
          config.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
          location.href = location.origin + '/#/login';
        }
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  // 服务器状态码为200
  (response) => {
    const data: any = response.data;
    if (data.status !== '0' && data.status !== 200) {
      if (data.status == '401') {
        localStorage.removeItem('expire');
        localStorage.removeItem('token');
        location.href = location.origin + '/#/login';
      }
      throw data.message;
    }
    return response;
  },
  // 服务器状态码不是200的情况
  (error) => {
    // const response: AxiosResponse = error.response || {};
    // const { status, statusText } = response;
    // throw codeMessage[status] || statusText;
    throw error
  }
);

export function get(url: string, params?: { [key: string]: any }): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url: string, params?: { [key: string]: any }): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postarrAybuffer(url: string, params: { [key: string]: any }): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data: params,
      responseType : 'arraybuffer'
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  });
}

export function put(
  url: string,
  data?: { [key: string]: any },
  params?: { [key: string]: any }
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'put',
      data,
      params
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteMethod(
  url: string,
  params?: { [key: string]: any },
  data?: { [key: string]: any }
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
        data
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}