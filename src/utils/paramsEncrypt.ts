import { encrypt } from './index';
import testing from './testing';

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDA8n//kKsqQkkb/nT30cR9xSPKqCNYP81sTx85o1It2dzsNZuw0epEbxVvKhPPeAAM7iDx6EyMUybHb57UdJpjhr0D76W9JQATRruIPsmnW0E5aKCsh2F5KO23qTcw+ji530FtE/KWNMtFhOgUj9JPGCcdMzh2wSJmCZEf+LJdjwIDAQAB';

const paramsEncrypt = (params: { [key: string]: any }) => {
  const keyList = [
    'vin',
    'phone',
    'channelUserId',
    'customerPhoneNumber',
    'masterUserId',
    '手机号',
    'masterPhone'
  ];
  for (let key in params) {
    const value = String(params[key]);
    if (
      value !== '' &&
      keyList.includes(key) &&
      !(testing.isBase64(value) && value.length === 172)
    ) {
      // RSA加密生成的base64字符串Length为172 为防止重复加密
      params[key] = encrypt(publicKey)(value);
    }
  }

  return params;
};

export default paramsEncrypt;
