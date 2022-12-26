// 用于login成功回跳解析token 解析成功后

import CryptoJS from 'crypto-js';
import { parseJwt } from './index';
import { login } from './login';
import router from '../router';
export const tokenParse = () => {
  const token = window.location.href.split('&')[0].split('access_token=')[1];
  const decoded = parseJwt(token);
  // 判断token是否有效
  // 无效的token解密出来的是一个空对象
  if (Object.keys(decoded).length === 0) {
    return false;
  } else if (decoded.exp > decoded.iat) {
    // 判断是否在有效期内
    localStorage.setItem('token', CryptoJS.SHA1(token).toString());
    const tokenMapping = JSON.stringify({
      key: CryptoJS.SHA1(token).toString(),
      value: token
    });
    localStorage.setItem('tokenMapping', tokenMapping);
    // 存储expire作为有效期的判断条件
    localStorage.setItem('expire', JSON.stringify(decoded.exp));
    router.push('/');
  } else {
    login();
  }
};
