				import worker, * as OTHER_EXPORTS from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\.wrangler\\tmp\\pages-q8vs9e\\zmlz5ewv09o.js";
				import * as __MIDDLEWARE_0__ from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "D:\\Learning\\Frontend\\Remix\\projects\\remix-cloudflare-socket-app\\.wrangler\\tmp\\pages-q8vs9e\\zmlz5ewv09o.js";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;