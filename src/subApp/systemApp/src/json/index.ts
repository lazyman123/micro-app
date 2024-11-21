export const userData = {
  userId: 2,
  username: "admin",
  nickname: "系统管理员",
  avatar:
    "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
  roles: ["ADMIN"],
  perms: [
    "sys:notice:edit",
    "sys:menu:delete",
    "sys:dict:edit",
    "sys:notice:query",
    "sys:dict:delete",
    "sys:config:add",
    "sys:config:refresh",
    "sys:menu:add",
    "sys:user:add",
    "sys:user:export",
    "sys:role:edit",
    "sys:dept:delete",
    "sys:config:update",
    "sys:user:password:reset",
    "sys:notice:revoke",
    "sys:user:import",
    "sys:user:delete",
    "sys:dict_type:delete",
    "sys:dict:add",
    "sys:role:add",
    "sys:notice:publish",
    "sys:notice:delete",
    "sys:dept:edit",
    "sys:dict_type:edit",
    "sys:user:query",
    "sys:user:edit",
    "sys:config:delete",
    "sys:dept:add",
    "sys:notice:add",
    "sys:role:delete",
    "sys:menu:edit",
    "sys:config:query",
  ],
};

export const tokenData = {
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ1c2VySWQiOjIsImlhdCI6MTcyODE5MzA1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJhZDg3NzlhZDZlYWY0OWY3OTE4M2ZmYmI5OWM4MjExMSJ9.58YHwL3sNNC22jyAmOZeSm-7MITzfHb_epBIz7LvWeA",
  tokenType: "Bearer",
  refreshToken: null,
  expires: null,
};

export const GoodsData = {
  data: {
    list: [
      {
        id: "498052210245145373",
        username: "梁桂英",
        gender: 2,
        user: {
          detail: {
            age: 28,
          },
        },
        idCard: "498052210245145373",
        email: "d.erlxcfmrxw@yjdhaky.中国互联.公司",
        address: "广西壮族自治区 河池市",
        createTime: "2017-05-16 23:42:07",
        status: 1,
        avatar: "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
      },
      {
        id: "517461025628240015",
        username: "吕涛",
        gender: 2,
        user: {
          detail: {
            age: 20,
          },
        },
        idCard: "517461025628240015",
        email: "v.xppaca@foycds.tt",
        address: "海外 海外",
        createTime: "2014-07-27 16:20:19",
        status: 1,
        avatar: "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
      },
      {
        id: "638051274225272215",
        username: "江磊",
        gender: 1,
        user: {
          detail: {
            age: 25,
          },
        },
        idCard: "638051274225272215",
        email: "q.kyev@vyapqsia.mo",
        address: "上海 上海市",
        createTime: "1987-07-31 20:08:59",
        status: 0,
        avatar: "https://i.imgtg.com/2023/01/16/QR57a.jpg",
      },
      {
        id: "828476364463242864",
        username: "梁明",
        gender: 2,
        user: {
          detail: {
            age: 17,
          },
        },
        idCard: "828476364463242864",
        email: "s.fxewblg@haihmhic.cd",
        address: "陕西省 榆林市",
        createTime: "1987-03-20 19:19:17",
        status: 1,
        avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
      },
    ],
    pageNum: 1,
    pageSize: 10,
    total: 20,
  },
};

export const TaskData = {
  data: {
    list: [
      {
        id: "498052210245145373",
        taskname: "promotion_task_202411201128_dlslxds",
        zhanghu: "YN-001",
        createType: 1,
        gender: 2,
        createTime: "2017-05-16 23:42:07",
        doneTime: "2022-05-16 23:42:07",
        status: 1,
      },
      {
        id: "498052210245145373",
        taskname: "promotion_task_202411201128_dlslxds",
        zhanghu: "YN-002",
        createType: 1,
        gender: 1,
        createTime: "2017-05-16 23:42:07",
        doneTime: "2022-05-16 23:42:07",
        status: 3,
      },
      {
        id: "498052210245145373",
        taskname: "promotion_task_202411201128_dlslxds",
        zhanghu: "YN-001",
        createType: 1,
        gender: 2,
        createTime: "2017-05-16 23:42:07",
        doneTime: "2022-05-16 23:42:07",
        status: 1,
      },
      {
        id: "498052210245145373",
        taskname: "promotion_task_202411201128_dlslxds",
        zhanghu: "YN-003",
        createType: 2,
        gender: 2,
        createTime: "2017-05-16 23:42:07",
        doneTime: "2022-05-16 23:42:07",
        status: 3,
      },
      {
        id: "498052210245145373",
        taskname: "promotion_task_202411201128_dlslxds",
        zhanghu: "YN-004",
        createType: 2,
        gender: 1,
        createTime: "2017-05-16 23:42:07",
        doneTime: "2022-05-16 23:42:07",
        status: 2,
      },
    ],
    pageNum: 1,
    pageSize: 10,
    total: 5,
  },
};

export const AreaData = [
  {
    value: "1",
    label: "亚洲",
    children: [
      {
        value: "1-1",
        label: "日本",
      },
      {
        value: "1-2",
        label: "韩国",
      },
    ],
  },
  {
    value: "2",
    label: "美洲",
    children: [
      {
        value: "2-1",
        label: "美国",
      },
      {
        value: "2-2",
        label: "加拿大",
      },
    ],
  },
  {
    value: "3",
    label: "澳洲",
    children: [
      {
        value: "3-1",
        label: "澳大利亚",
      },
      {
        value: "3-2",
        label: "新西兰",
      },
    ],
  },
];
