## 项目启动

```bash
# 克隆代码
git clone https://e.coding.net/g-inct5705/weiqianduanzhonghoutai/vue3-element-admin.git

# 切换目录
cd vue3-element-admin


# 设置镜像源(可忽略)
npm config set registry https://registry.npmmirror.com

# 安装依赖
npm install

# 启动运行
npm run dev
```

## 项目部署

```bash
# 项目打包
npm run build

```

## 本地Mock

项目同时支持在线和本地 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，修改文件 `.env.development` 的 `VITE_MOCK_DEV_SERVER` 为 `true` **即可**。
