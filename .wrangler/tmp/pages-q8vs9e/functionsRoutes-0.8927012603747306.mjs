import { onRequest as ____path___js_onRequest } from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\functions\\[[path]].js"

export const routes = [
    {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  ]