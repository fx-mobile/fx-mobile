
import { customAsync } from "@/api/async";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import localStorageUtil from "@/utils/localStorageUtil";

export const getUserInfo = function (that, callback, async = true) {
    if (async) {
        customAsync({
            that: that,
            method: "getUserInfo",
            notShowLoading: true,
            paramObj: {},
            filterFlag: true,
            callback: res => {
                if (callback) {
                    callback(res); //自定义操作
                    return;
                }
                if (res.errorcode == 0) {
                    sessionStorageUtil.setItem(
                        sessionStorageUtil.USER_LOGIN_INFO,
                        res.data
                    );
                    localStorageUtil.setItem(
                        localStorageUtil.USER_LOGIN_INFO,
                        res.data
                    );
                    sessionStorageUtil.setItem(sessionStorageUtil.USER_LOGIN_STATUS, true)
                } else if (res.errorcode == 1001) {
                    sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_INFO)
                    sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_STATUS)
                }
            }
        });
    } else {
        return new Promise(resolve => {
            customAsync({
                that: that,
                method: "getUserInfo",
                notShowLoading: true,
                paramObj: {},
                filterFlag: true,
                callback: res => {
                    if (callback) {
                        callback(res); //自定义操作
                        resolve(res);
                        return;
                    }
                    if (res.errorcode == 0) {
                        sessionStorageUtil.setItem(
                            sessionStorageUtil.USER_LOGIN_INFO,
                            res.data
                        );
                        localStorageUtil.setItem(
                            localStorageUtil.USER_LOGIN_INFO,
                            res.data
                        );
                        sessionStorageUtil.setItem(sessionStorageUtil.USER_LOGIN_STATUS, true)
                    } else if (res.errorcode == 1001) {
                        sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_INFO)
                        sessionStorageUtil.removeItem(sessionStorageUtil.USER_LOGIN_STATUS)
                    }
                    resolve(res);
                }
            });
        })
    }

}
