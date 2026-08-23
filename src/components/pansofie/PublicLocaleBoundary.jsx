import React, { useLayoutEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translatePublicText } from "@/lib/publicTranslations";
import { translatePublicBulkText } from "@/lib/publicTranslationsR10Bulk";

const textState = new WeakMap();
const attributeState = new WeakMap();
const TRANSLATABLE_ATTRIBUTES = ["aria-label", "placeholder", "title", "alt"];
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "NOSCRIPT"]);

function shouldSkip(node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  if (!element) return true;
  if (SKIP_TAGS.has(element.tagName)) return true;
  return Boolean(element.closest("[data-i18n-ignore='true']"));
}

function translate(value, locale) {
  const primary = translatePublicText(value, locale);
  return primary === value ? translatePublicBulkText(value, locale) : primary;
}

function translateTextNode(node, locale) {
  if (shouldSkip(node)) return;
  const current = node.nodeValue ?? "";
  let state = textState.get(node);

  if (!state) {
    state = { cs: current, en: null };
    textState.set(node, state);
  } else if (current !== state.cs && current !== state.en) {
    state.cs = current;
    state.en = null;
  }

  if (locale === "en") {
    state.en = translate(state.cs, "en");
    if (current !== state.en) node.nodeValue = state.en;
  } else if (current !== state.cs) {
    node.nodeValue = state.cs;
  }
}

function translateAttributes(element, locale) {
  if (shouldSkip(element)) return;
  let state = attributeState.get(element);
  if (!state) {
    state = {};
    attributeState.set(element, state);
  }

  for (const attribute of TRANSLATABLE_ATTRIBUTES) {
    if (!element.hasAttribute(attribute)) continue;
    const current = element.getAttribute(attribute) ?? "";
    const previous = state[attribute];

    if (!previous) {
      state[attribute] = { cs: current, en: null };
    } else if (current !== previous.cs && current !== previous.en) {
      previous.cs = current;
      previous.en = null;
    }

    const record = state[attribute];
    if (locale === "en") {
      record.en = translate(record.cs, "en");
      if (current !== record.en) element.setAttribute(attribute, record.en);
    } else if (current !== record.cs) {
      element.setAttribute(attribute, record.cs);
    }
  }
}

function translateTree(root, locale) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateTextNode(node, locale);
    node = walker.nextNode();
  }

  translateAttributes(root, locale);
  root.querySelectorAll("*").forEach((element) => translateAttributes(element, locale));
}

export default function PublicLocaleBoundary({ children }) {
  const rootRef = useRef(null);
  const { locale } = useLanguage();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let observer;
    let scheduled = false;

    const observe = () => observer?.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRIBUTES,
    });

    const apply = () => {
      scheduled = false;
      observer?.disconnect();
      translateTree(root, locale);
      observe();
    };

    observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(apply);
    });

    apply();
    return () => observer.disconnect();
  }, [locale]);

  return (
    <div ref={rootRef} className="contents" data-public-locale={locale}>
      {children}
    </div>
  );
}
