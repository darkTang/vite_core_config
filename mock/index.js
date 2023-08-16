import mockjs from "mockjs";

const userList = mockjs.mock({
  "data|100": [
    {
      "name": "@cname",
      "ename": "@name",
      "id|+1": 1,
      "avatar": mockjs.Random.dataImage()
    },
  ],
});

module.exports = [
  {
    method: "post",
    url: "/api/users",
    response: ({ body }) => {
      return {
        code: 200,
        msg: "ok",
        data: [],
      };
    },
  },
];
