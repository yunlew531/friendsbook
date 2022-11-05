import {
  isRejectedWithValue,
  Middleware,
  Dispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { LoginError, RegisterError, UploadImgError } from 'types/enums';
import toast from 'react-hot-toast';
import { RootState } from 'store';

const consoleStyle = 'background: #FF1E1E; color: #fff';
const consoleStyle2 = 'background: #28B5B5; color: #fff';

const rtkQueryErrorLogger: Middleware<{}, RootState> = () => (
  next: Dispatch<AnyAction>,
) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('%c middleware catch error ', consoleStyle, action);
    const { endpointName } = action.meta.arg;
    const { code } = action.payload.data;
    let errMsg = '';
    // 登入錯誤
    if (endpointName === 'login') errMsg = LoginError[code];
    // 註冊錯誤
    if (endpointName === 'register') errMsg = RegisterError[code];
    // 圖片上傳錯誤
    if (endpointName === 'uploadImg') errMsg = UploadImgError[code];

    if (errMsg) toast.error(errMsg);
    console.warn('%c status ', consoleStyle2, action.payload.status);
    console.warn('%c 錯誤訊息 ', consoleStyle2, action.payload.data?.message);
    console.warn('%c error code ', consoleStyle2, code);
    console.warn('%c middleware end ', consoleStyle);
  }
  return next(action);
};

export default rtkQueryErrorLogger;
