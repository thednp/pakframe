import { h } from "@core";
import type { DOMNodeAttributes, PotentialProps } from "../types/types";
import { addMeta } from "./Head";

/**
 * Add a new `<title>` tag
 */
export const Title = (
  props: DOMNodeAttributes<PotentialProps<"title">, "title">,
  content: string,
) => {
  addMeta(h("title", props, content));
  return null;
};

/**
 * Add a new `<meta>` tag
 */
export const Meta = (
  props: DOMNodeAttributes<PotentialProps<"meta">, "meta">,
) => {
  addMeta(h("meta", props));
  return null;
};

/**
 * Add a new `<link>` tag
 */
export const Link = (
  props: DOMNodeAttributes<PotentialProps<"link">, "link">,
) => {
  addMeta(h("link", props));
  return null;
};

/**
 * Add a new `<script>` tag
 */
export const Script = (
  props: DOMNodeAttributes<PotentialProps<"script">, "script">,
  content: string,
) => {
  addMeta(h("script", props, content));
  return null;
};

/**
 * Add a new `<style>` tag
 */
export const Style = (
  props: DOMNodeAttributes<PotentialProps<"style">, "style">,
  content: string,
) => {
  addMeta(h("style", props, content));
  return null;
};
