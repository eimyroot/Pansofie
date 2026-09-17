import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const bundledNodeModules = "/Users/eimyna/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";

function parseArgs(argv) {
  const args = {
    baseUrl: "http://127.0.0.1:4311",
    out: "/Users/eimyna/0_EVIDENCE/Pansofie/UI_POINT3_MATRIX",
    routes: ["/", "/7-cest", "/impact", "/young", "/young/objevuj", "/go", "/go/mapa", "/go/nastaveni"],
    viewports: [320, 375, 768, 1024, 1440],
    height: 1000,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === "--base-url" && value) {
      args.baseUrl = value.replace(/\/$/, "");
      i += 1;
    } else if (flag === "--out" && value) {
      args.out = value;
      i += 1;
    } else if (flag === "--routes" && value) {
      args.routes = value.split(",").map((route) => route.trim()).filter(Boolean);
      i += 1;
    } else if (flag === "--viewports" && value) {
      args.viewports = value.split(",").map((width) => Number(width.trim())).filter(Number.isFinite);
      i += 1;
    } else if (flag === "--height" && value) {
      args.height = Number(value);
      i += 1;
    }
  }

  return args;
}

function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    return require(require.resolve("playwright", { paths: [bundledNodeModules] }));
  }
}

function routeSlug(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/-$/, "");
}

function absoluteUrl(baseUrl, route) {
  return `${baseUrl}${route.startsWith("/") ? route : `/${route}`}`;
}

const args = parseArgs(process.argv.slice(2));
fs.mkdirSync(args.out, { recursive: true });

const { chromium } = loadPlaywright();
const browser = await chromium.launch({ headless: true });
const report = [];

try {
  for (const route of args.routes) {
    for (const width of args.viewports) {
      const page = await browser.newPage({ viewport: { width, height: args.height }, deviceScaleFactor: 1 });
      const url = absoluteUrl(args.baseUrl, route);
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      await page.screenshot({
        path: path.join(args.out, `${routeSlug(route)}-${width}.png`),
        fullPage: true,
      });

      const metrics = await page.evaluate(() => ({
        title: document.title,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scroll: {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        },
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        imageCount: document.images.length,
        brokenImages: Array.from(document.images)
          .filter((image) => image.complete && image.currentSrc && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        headings: Array.from(document.querySelectorAll("h1"))
          .map((heading) => heading.textContent.trim())
          .filter(Boolean),
      }));

      report.push({
        route,
        url,
        width,
        status: response?.status() ?? null,
        screenshot: `${routeSlug(route)}-${width}.png`,
        ...metrics,
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const reportPath = path.join(args.out, "viewport-matrix-report.json");
fs.writeFileSync(reportPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  baseUrl: args.baseUrl,
  out: args.out,
  routes: args.routes,
  viewports: args.viewports,
  report,
}, null, 2)}\n`);

const failures = report.filter((item) => item.status !== 200 || item.horizontalOverflow || item.brokenImages.length);
console.log(`PANSOFIE_VIEWPORT_MATRIX=${failures.length ? "FAIL" : "PASS"}`);
console.log(`PANSOFIE_VIEWPORT_MATRIX_REPORT=${reportPath}`);
console.log(`PANSOFIE_VIEWPORT_MATRIX_SCREENSHOTS=${report.length}`);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
