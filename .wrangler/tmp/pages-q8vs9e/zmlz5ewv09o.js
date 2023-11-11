// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/favicon.ico", "/build/*"]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\.wrangler\\tmp\\pages-q8vs9e\\functionsWorker-0.5207615500190461.mjs";
export * from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\.wrangler\\tmp\\pages-q8vs9e\\functionsWorker-0.5207615500190461.mjs";
import { isRoutingRuleMatch } from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=zmlz5ewv09o.js.map
