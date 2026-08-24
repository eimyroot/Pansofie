import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PANSOFIE_LOCAL_URL || "http://127.0.0.1:5173";
const EVIDENCE_DIR = path.resolve("browser-evidence/bubble-readability-r11");
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

function px(value) {
  return Number.parseFloat(value || "0");
}

function rgb(value) {
  const match = String(value || "").match(/rgba?\(\s*([\d.]+)[, ]+\s*([\d.]+)[, ]+\s*([\d.]+)/i);
  return match ? match.slice(1, 4).map(Number) : null;
}

function luminance(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function contrast(foreground, background) {
  const fg = rgb(foreground);
  const bg = rgb(background);
  if (!fg || !bg) return 0;
  const lf = 0.2126 * luminance(fg[0]) + 0.7152 * luminance(fg[1]) + 0.0722 * luminance(fg[2]);
  const lb = 0.2126 * luminance(bg[0]) + 0.7152 * luminance(bg[1]) + 0.0722 * luminance(bg[2]);
  return (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
}

for (const viewport of [
  { label: "desktop", width: 1440, height: 1100, mobile: false },
  { label: "mobile", width: 390, height: 844, mobile: true },
]) {
  test(`R11 bubble readability ${viewport.label}`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.mobile,
    });
    const page = await context.newPage();
    const response = await page.goto(`${BASE_URL}/pro-koho`, { waitUntil: "networkidle" });
    expect(response).not.toBeNull();
    expect(response.status()).toBeLessThan(400);

    await page.locator(".reference-network-r5__node").first().waitFor({ state: "visible" });

    const metrics = await page.evaluate(() => {
      const node = document.querySelector(".reference-network-r5__node");
      const nodeLabel = node?.querySelector("span");
      const ribbon = document.querySelector(".route-network-ribbon-node");
      const ribbonLabel = ribbon?.querySelector("strong");
      const roleMap = document.querySelector(".role-map-node");
      const roleCopy = document.querySelector(".role-map-copy");
      const orbitText = document.querySelector(".route-orbit-node text");

      const read = (element) => element ? getComputedStyle(element) : null;
      const nodeStyle = read(node);
      const nodeLabelStyle = read(nodeLabel);
      const ribbonStyle = read(ribbon);
      const ribbonLabelStyle = read(ribbonLabel);
      const roleMapStyle = read(roleMap);
      const roleCopyStyle = read(roleCopy);
      const orbitTextStyle = read(orbitText);

      return {
        page: {
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
        },
        node: nodeStyle && {
          width: nodeStyle.width,
          minHeight: nodeStyle.minHeight,
          background: nodeStyle.backgroundColor,
          color: nodeStyle.color,
          border: nodeStyle.borderColor,
        },
        nodeLabel: nodeLabelStyle && {
          fontSize: nodeLabelStyle.fontSize,
          fontWeight: nodeLabelStyle.fontWeight,
          lineHeight: nodeLabelStyle.lineHeight,
          color: nodeLabelStyle.color,
        },
        ribbon: ribbonStyle && {
          background: ribbonStyle.backgroundColor,
          color: ribbonStyle.color,
          border: ribbonStyle.borderColor,
        },
        ribbonLabel: ribbonLabelStyle && {
          fontSize: ribbonLabelStyle.fontSize,
          fontWeight: ribbonLabelStyle.fontWeight,
          color: ribbonLabelStyle.color,
        },
        roleMap: roleMapStyle && {
          background: roleMapStyle.backgroundColor,
          color: roleMapStyle.color,
          border: roleMapStyle.borderColor,
        },
        roleCopy: roleCopyStyle && {
          fontSize: roleCopyStyle.fontSize,
          lineHeight: roleCopyStyle.lineHeight,
          color: roleCopyStyle.color,
        },
        orbitText: orbitTextStyle && {
          fontSize: orbitTextStyle.fontSize,
          fontWeight: orbitTextStyle.fontWeight,
          color: orbitTextStyle.fill || orbitTextStyle.color,
        },
      };
    });

    expect(metrics.page.scrollWidth, "no horizontal overflow").toBeLessThanOrEqual(metrics.page.innerWidth + 1);
    expect(metrics.node).not.toBeNull();
    expect(metrics.nodeLabel).not.toBeNull();
    expect(metrics.ribbon).not.toBeNull();
    expect(metrics.ribbonLabel).not.toBeNull();

    expect(contrast(metrics.nodeLabel.color, metrics.node.background), "node label contrast").toBeGreaterThanOrEqual(4);
    expect(px(metrics.nodeLabel.fontSize)).toBeGreaterThanOrEqual(viewport.mobile ? 10.7 : 12);
    expect(Number.parseInt(metrics.nodeLabel.fontWeight, 10)).toBeGreaterThanOrEqual(600);

    expect(contrast(metrics.ribbonLabel.color, metrics.ribbon.background), "ribbon label contrast").toBeGreaterThanOrEqual(3.2);
    expect(px(metrics.ribbonLabel.fontSize)).toBeGreaterThanOrEqual(viewport.mobile ? 10.5 : 11);

    if (metrics.roleMap && metrics.roleCopy) {
      expect(contrast(metrics.roleCopy.color, metrics.roleMap.background), "role-map copy contrast").toBeGreaterThanOrEqual(3.2);
      expect(px(metrics.roleCopy.fontSize)).toBeGreaterThanOrEqual(viewport.mobile ? 13 : 13.5);
    }

    const nodes = page.locator(".reference-network-r5__node");
    if (await nodes.count() > 1) {
      await nodes.nth(1).click();
      await page.waitForTimeout(120);
      const active = page.locator('.reference-network-r5__node[data-active="true"]');
      await expect(active).toBeVisible();
      const activeStyle = await active.evaluate((element) => {
        const style = getComputedStyle(element);
        const labelStyle = getComputedStyle(element.querySelector("span"));
        return { background: style.backgroundColor, color: labelStyle.color };
      });
      expect(contrast(activeStyle.color, activeStyle.background), "active-node label contrast").toBeGreaterThanOrEqual(4);
    }

    await page.screenshot({
      path: path.join(EVIDENCE_DIR, `roles-bubbles-${viewport.label}.png`),
      fullPage: true,
    });

    fs.writeFileSync(
      path.join(EVIDENCE_DIR, `computed-${viewport.label}.json`),
      JSON.stringify(metrics, null, 2),
    );

    await context.close();
  });
}
