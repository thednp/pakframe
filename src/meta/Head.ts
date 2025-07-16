import { isServer } from "../util";
import { getTagKey } from "../helpers/head-helpers";
import type { SupportedHeadTags } from "./types";

/**
 * Create a new Map for each request on server
 */
const createHeadTags = () => new Map<string, SupportedHeadTags>();

/**
 * Get the current head tags. Use a factory pattern to get the right store
 * on the server and the client.
 */
const getHeadTags = (() => {
  if (isServer) {
    // On server, create one Map per request scope
    let serverHeadTags: Map<string, SupportedHeadTags>;
    return () => {
      if (!serverHeadTags) {
        serverHeadTags = createHeadTags();
      }
      return serverHeadTags;
    };
  }
  // On client, use a singleton
  const clientHeadTags = createHeadTags();
  return () => clientHeadTags;
})();

/**
 * Clear all head tags
 */
export const resetHeadTags = () => {
  const tags = getHeadTags();
  tags.clear();
};

/**
 * Initialize the head tags
 */
export const initializeHeadTags = () => {
  const tags = getHeadTags();
  /* istanbul ignore else */
  if (!tags.size && !isServer) {
    Array.from(document.head.children).forEach((tag) => {
      tags.set(getTagKey(tag), tag as SupportedHeadTags);
    });
  }
};

/**
 * Add a new meta tag
 */
export const addMeta = (tag: SupportedHeadTags) => {
  if (!tag) return;
  const tags = getHeadTags();
  const key = getTagKey(tag);
  tags.set(key, tag);
};

/**
 * Get the head tags
 */
export const Head = () => {
  // return () => {
  const tags = getHeadTags();
  return Array.from(tags.values());
  // };
};
