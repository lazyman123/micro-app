import { defineMock } from "./base";

export default defineMock([
  {
    url: "menus/routes",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        {
          path: "/doc",
          component: "Layout",
          redirect: "https://juejin.cn/post/7228990409909108793",
          name: "/doc",
          meta: {
            title: "平台文档",
            icon: "menu",
            hidden: false,
            alwaysShow: false,
            params: null,
          },
          children: [
            {
              path: "internal-doc",
              component: "doc/internal-doc",
              name: "InternalDoc",
              meta: {
                title: "document",
                icon: "document",
                hidden: false,
                alwaysShow: false,
                params: null,
              },
            },
            {
              path: "https://juejin.cn/post/7228990409909108793",
              name: "Https://juejin.cn/post/7228990409909108793",
              meta: {
                title: "平台文档(外链)",
                icon: "link",
                hidden: false,
                alwaysShow: false,
                params: null,
              },
            },
          ],
        },
      ],
      msg: "一切ok",
    },
  },
]);
