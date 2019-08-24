import { getCookie } from "~/utils/cookie";

export default function(ctx) {
  const token = getCookie(ctx.$axios).token;
  ctx.$axios.defaults.headers.Authorization = `Bearer ${token}`;
  return ctx.store.dispatch("auth/check");
}
