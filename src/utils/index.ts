import { login } from './login';
import JSEncrypt from 'jsencrypt';

type StringObj = { [k: string]: string };

/**
 * 获取url参数值
 * @param {String} name 参数名称(不传则返回一个全部参数对象)
 */
export function getUrlParam(name = ''): string | StringObj | null {
  const href = window.location.href,
    i = href.indexOf('?');
  if (i < 0) return null;
  const str = href.slice(i);
  if (!str) return null;
  const arr = str.match(/([^?&=#]+)=([^?&=#/]*)/g);
  if (!arr) return null;
  const obj: StringObj = {};
  arr.forEach((v) => {
    const temp = v.split('=');
    if (temp.length > 0) {
      obj[temp[0]] = temp[1];
    }
  });
  if (name) return obj[name];
  return obj;
}

export function parseJwt(token: string): UTILS.UserInfo {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export function getUserInfo() {
  const token = localStorage.getItem('tokenMapping');
  if (!token || localStorage.getItem('token') !== JSON.parse(token).key) {
    login();
  }
  const info = parseJwt(JSON.parse(token as string).value);
  return info;
}

export const downloadFile = (file: BlobPart, fileName: string) => {
  const blob = new Blob([file]); // 构造一个blob对象来处理数据
  const link = document.createElement('a'); // 创建a标签
  link.download = fileName; // a标签添加属性
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click(); // 执行下载
  URL.revokeObjectURL(link.href); // 释放url
  document.body.removeChild(link); // 释放标签
};

export const encrypt = (publickey: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publickey);
  return (data: string) => encrypt.encrypt(data);
};

export const findMenuDeepCode = (item: API.MenusItem) => {
  let last = item;
  while (last.children && last.children.length > 0) {
    last = last.children[0];
  }
  return last.code;
};
