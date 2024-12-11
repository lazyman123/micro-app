<template>
  <div class="login">
    <!-- 登录页内容 -->
    <div class="login-wrapper">
      <div class="login-img">
        <el-image :src="loginImage" />
      </div>
      <div class="login-content">
        <div class="login-form">
          <el-form ref="loginFormRef" :model="loginData" :rules="loginRules">
            <div class="form-title">{{ t("Login.Title") }}</div>

            <!-- 用户名 -->
            <el-form-item prop="username">
              <div class="input-wrapper">
                <el-icon class="mx-2">
                  <User />
                </el-icon>
                <el-input
                  ref="username"
                  v-model="loginData.username"
                  :placeholder="t('Login.Username')"
                  name="username"
                  size="large"
                  class="h-[48px]"
                />
              </div>
            </el-form-item>

            <!-- 密码 -->
            <el-tooltip
              :visible="isCapslock"
              content="大写锁定已打开"
              placement="right"
            >
              <el-form-item prop="password">
                <div class="input-wrapper">
                  <el-icon class="mx-2">
                    <Lock />
                  </el-icon>
                  <el-input
                    v-model="loginData.password"
                    :placeholder="t('Login.Message.Password.Required')"
                    type="password"
                    name="password"
                    size="large"
                    class="h-[48px] pr-2"
                    show-password
                    @keyup="checkCapslock"
                    @keyup.enter="handleLoginSubmit"
                  />
                </div>
              </el-form-item>
            </el-tooltip>

            <!-- 验证码 -->
            <!-- <el-form-item prop="captchaCode">
            <div class="input-wrapper">
              <svg-icon icon-class="captcha" class="mx-2" />
              <el-input
                v-model="loginData.captchaCode"
                auto-complete="off"
                size="large"
                class="flex-1"
                placeholder="请输入验证码"
                @keyup.enter="handleLoginSubmit"
              />

              <el-image
                :src="captchaBase64"
                class="captcha-img"
                @click="getCaptcha"
              />
            </div>
          </el-form-item> -->
            <div class="flex-x-between w-full py-1">
              <!-- <el-checkbox> 记住我 </el-checkbox> -->
              <!-- <el-link type="primary" href="/forget-password"> 忘记密码 </el-link> -->
            </div>
            <div class="agreement">
              <el-checkbox
                class="agreement-checkbox"
                v-model="loginData.isAgree"
                @change="handleAgreementChange"
              >
                {{ t("Login.Accept") + '&nbsp;' }}
              </el-checkbox>
              <a
                href="http://business.zhuoda.work/pravicy.html"
                target="_blank"
              >
                {{ t("Login.Privacy") }}
              </a>
            </div>

            <!-- 登录按钮 -->
            <el-button
              :loading="loading"
              type="primary"
              size="large"
              class="w-full"
              @click.prevent="handleLoginSubmit"
            >
              {{ t("Login.Login") }}
            </el-button>
          </el-form>
        </div>
      </div>
    </div>

    <!--  -->
    <!-- <div class="login-footer">
      <el-text size="small">
        Copyright © 2021 - 2024 youlai.tech All Rights Reserved.
        <el-link
          :underline="false"
          href="http://beian.miit.gov.cn/"
          target="_blank"
        >
          皖ICP备20006496号-2
        </el-link>
      </el-text>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { LocationQuery, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import AuthAPI, { type LoginData } from "@/api/auth";
import router from "@/router";

import type { FormInstance } from "element-plus";

import { useUserStore } from "@/store";
const userStore = useUserStore();
const { t } = useI18n();

const route = useRoute();
const loginFormRef = ref<FormInstance>();

const loading = ref(false); // 按钮 loading 状态
const isCapslock = ref(false); // 是否大写锁定
const captchaBase64 = ref(); // 验证码图片Base64字符串

const loginImage = ref(
  new URL("@/assets/images/login_left.png", import.meta.url).href
);

const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
  isAgree: false,
  captchaKey: "",
  captchaCode: "",
});

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("Login.Message.Username.Required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("Login.Message.Password.Required"),
      },
      {
        min: 6,
        message: "密码不能少于6位",
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: "请输入验证码",
      },
    ],
  };
});

const handleAgreementChange = (val) => {
  loginData.value.isAgree = val;
};

/** 获取验证码 */
function getCaptcha() {
  AuthAPI.getCaptcha().then((data) => {
    loginData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}

/** 登录表单提交 */
async function handleLoginSubmit() {
  // 跳转到登录前的页面
  loginFormRef.value?.validate((valid: boolean) => {
    if (loginData.value.isAgree == false) {
      ElMessage.error(t("Login.BeforePrivacy"));
      return;
    }
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(async () => {
          await userStore.getUserInfo();
          // 跳转到登录前的页面
          const { path, queryParams } = parseRedirect();
          router.push({ path: path, query: queryParams });
        })
        .catch(() => {
          // getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
  // loginFormRef.value?.validate((valid: boolean) => {
  //   if (valid) {
  //     loading.value = true;
  //     userStore
  //       .login(loginData.value)
  //       .then(async () => {
  //         await userStore.getUserInfo();
  //         // 跳转到登录前的页面
  //         const { path, queryParams } = parseRedirect();
  //         router.push({ path: path, query: queryParams });
  //       })
  //       .catch(() => {
  //         getCaptcha();
  //       })
  //       .finally(() => {
  //         loading.value = false;
  //       });
  //   }
  // });
}

/**
 * 解析 redirect 字符串 为 path 和  queryParams
 *
 * @returns { path: string, queryParams: Record<string, string> } 解析后的 path 和 queryParams
 */
function parseRedirect(): {
  path: string;
  queryParams: Record<string, string>;
} {
  const query: LocationQuery = route.query;
  const redirect = (query.redirect as string) ?? "/";

  const url = new URL(redirect, window.location.origin);
  const path = url.pathname;
  const queryParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { path, queryParams };
}

// 检查输入大小写
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

onMounted(() => {
  // getCaptcha();
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  background-image: url("@/assets/images/login_bg.svg");
  background-size: 100% 100%;
  background-size: cover;
  .login-wrapper {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96.5%;
    height: 94%;
    padding: 0 50px;
    background-color: rgb(255 255 255 / 80%);
    border-radius: 10px;
    .login-header {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 15px;

      .logo {
        width: 26px;
        height: 26px;
      }

      .title {
        margin: auto 5px;
        font-size: 26px;
        font-weight: bold;
        color: transparent;
        background: linear-gradient(to right, #3b82f6, #14b8a6);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .login-img {
      display: flex;
      transform: scale(0.7);
      @media (width <= 768px) {
        display: none;
      }
    }

    .login-content {
      display: flex;
      background-color: #fff;
      width: 480px;
      padding: 50px 40px 45px;
      border-radius: 10px;
      box-shadow: var(--el-box-shadow);

      @media (width <= 768px) {
        flex-direction: column;
        max-width: 100%;
        height: 100vh;
        border-radius: 0;
        box-shadow: none;
      }

      .login-form {
        display: flex;
        flex: 1;
        min-width: 400px;
        flex-direction: column;
        justify-content: center;

        @media (width <= 768px) {
          width: 100%;
          padding: 0 20px;
        }

        .form-title {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
          font-size: 20px;
          text-align: center;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .captcha-img {
          height: 48px;
          cursor: pointer;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        .agreement {
          display: flex;
          align-items: center;
          justify-content: left;
          margin-top: -10px;
          margin-bottom: 10px;
          .el-form-item {
            border: none;
          }
          :deep(.agreement-checkbox) {
            .el-checkbox__label {
              font-size: 12px;
            }
          }
          a {
            color: var(--el-color-primary);
            font-size: 12px;
          }
        }

        .third-party-login {
          display: flex;
          justify-content: center;
          width: 100%;
          color: var(--el-text-color-secondary);

          *:not(:first-child) {
            margin-left: 20px;
          }

          .icon {
            cursor: pointer;
          }
        }
      }
    }

    .login-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
    }
  }
}

:deep(.el-form-item) {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
  .el-form-item__error {
    padding-top: 6px;
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}

html.dark {
  .login {
    background: url("@/assets/images/login-background-dark.jpg") no-repeat
      center right;

    .login-content {
      width: 480px;
      padding: 50px 40px 45px;
      background-color: var(--el-bg-color);
      border-radius: 10px;
      background: transparent;
      box-shadow: var(--el-box-shadow);
    }
  }
}
</style>
