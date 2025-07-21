import { DOMNodeAttributes, PotentialProps } from "./types-CjexJQM1.cjs";

//#region src/meta/types.d.ts
type SupportedHeadTags = HTMLTitleElement | HTMLMetaElement | HTMLScriptElement | HTMLLinkElement | HTMLStyleElement;
type HeadTags = SupportedHeadTags[];
//#endregion
//#region src/meta/Head.d.ts
/**
 * Clear all head tags
 */
declare const resetHeadTags: () => void;
/**
 * Initialize the head tags
 */
declare const initializeHeadTags: () => void;
/**
 * Add a new meta tag
 */
declare const addMeta: (tag: SupportedHeadTags) => void;
/**
 * Get the head tags
 */
declare const Head: () => SupportedHeadTags[];
//#endregion
//#region src/meta/tags.d.ts
/**
 * Add a new `<title>` tag
 */
declare const Title: (props: DOMNodeAttributes<PotentialProps<"title">, "title">, content: string) => null;
/**
 * Add a new `<meta>` tag
 */
declare const Meta: (props: DOMNodeAttributes<PotentialProps<"meta">, "meta">) => null;
/**
 * Add a new `<link>` tag
 */
declare const Link: (props: DOMNodeAttributes<PotentialProps<"link">, "link">) => null;
/**
 * Add a new `<script>` tag
 */
declare const Script: (props: DOMNodeAttributes<PotentialProps<"script">, "script">, content: string) => null;
/**
 * Add a new `<style>` tag
 */
declare const Style: (props: DOMNodeAttributes<PotentialProps<"style">, "style">, content: string) => null;
//#endregion
//#region src/helpers/head-helpers.d.ts
declare const parseAttributes: (attributeString: string) => Record<string, string>;
declare const getTagKey: (tag: Element) => string;
//#endregion
export { Head, HeadTags, Link, Meta, Script, Style, SupportedHeadTags, Title, addMeta, getTagKey, initializeHeadTags, parseAttributes, resetHeadTags };
//# sourceMappingURL=meta.d.cts.map