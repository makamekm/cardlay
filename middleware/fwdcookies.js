export default function(ctx, ...args) {
  if (!process.client) {
    Object.keys(ctx.req.headers).map(key => {
      ctx.$axios.defaults.headers.common[key] = ctx.req.headers[key];
    });
  }
}
