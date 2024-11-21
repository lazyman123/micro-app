// import AuthAPI, { type LoginData } from "@/api/auth";
// import UserAPI, { type UserInfo } from "@/api/user";

import type { LoginData } from "@/api/auth";
import type { UserInfo } from "@/api/user";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { store } from "@/store";
import { setToken, clearToken } from "@/utils/auth";

import { userData, tokenData } from "@/json";
export const useUserStore = defineStore("user", () => {
  const userInfo = useStorage<UserInfo>("userInfo", {} as UserInfo);

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      const { tokenType, accessToken } = tokenData;
      setToken(tokenType + " " + accessToken);
      resolve();
    });
    // return new Promise<void>((resolve, reject) => {
    //   AuthAPI.login(loginData)
    //     .then((data) => {
    //       const { tokenType, accessToken } = data;
    //       setToken(tokenType + " " + accessToken); // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      Object.assign(userInfo.value, { ...userData });
      resolve(userData);
    });

    // return new Promise<UserInfo>((resolve, reject) => {
    //   UserAPI.getInfo()
    //     .then((data) => {
    //       if (!data) {
    //         reject("Verification failed, please Login again.");
    //         return;
    //       }
    //       if (!data.roles || data.roles.length <= 0) {
    //         reject("getUserInfo: roles must be a non-null array!");
    //         return;
    //       }
    //       Object.assign(userInfo.value, { ...data });
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }

  /**
   * 登出
   */
  function logout() {
    return new Promise<void>((resolve, reject) => {
      clearUserSession();
      resolve();
    });

    // return new Promise<void>((resolve, reject) => {
    //   AuthAPI.logout()
    //     .then(() => {
    //       clearUserSession();
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  /**
   *  清理用户会话
   *
   * @returns
   */
  function clearUserSession() {
    return new Promise<void>((resolve) => {
      clearToken();
      usePermissionStoreHook().resetRouter();
      resolve();
    });
  }
  return {
    userInfo,
    login,
    getUserInfo,
    logout,
    clearUserSession,
  };
});

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useUserStoreHook() {
  return useUserStore(store);
}
