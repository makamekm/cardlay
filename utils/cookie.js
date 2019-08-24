import cookie from "cookie";

export const getCookie = ($axios) => {
  if (process.client) {
    return cookie.parse(document.cookie || "");
  } else {
    return cookie.parse($axios.defaults.headers.common.cookie || "");
  }
};

const date = new Date();
const days = 365;
date.setTime(+ date + (days * 86400000));

export const setCookie = (cookies, data = {
  token: {
    expiration: date.toGMTString(),
    path: "/",
  },
}) => {
  const newCookie = Object.keys(cookies)
    .map(key => {
      const cook = cookie.serialize(key, cookies[key]);
      if (data[key]) {
        return `${cook}; expires=${data[key].expiration}; path=${data[key].path}`;
      } else {
        return cook;
      }
    })
    .join("; ");
  document.cookie = newCookie;
};
