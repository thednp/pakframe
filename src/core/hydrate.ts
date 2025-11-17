import { unwrap } from "../router/index";
import { getTagKey } from "../meta";
import type { DOMElement } from "../types/types";

const isTag = (target: DOMElement, ...tagNames: string[]) => {
  return tagNames.some((tag) =>
    target.tagName.toLowerCase() === tag.toLowerCase()
  );
};

const hasHydrationKeys = (target: Element) => {
  return target.querySelector("[data-hk]") !== undefined;
};

/**
 * Hydrate a target element
 */
export const hydrate = (
  target: DOMElement,
  content: DOMElement | DOMElement[] | Promise<DOMElement | DOMElement[]>,
) => {
  if (content instanceof Promise) {
    content.then((res) => {
      if (!target.hasAttribute("data-h")) {
        hydrate(target, res);
      } else {
        const wrapper = unwrap(res);
        target.replaceChildren(
          ...(Array.from(wrapper.children) as (DOMElement | Text)[]),
        );
      }
    });
    return target;
  }

  const wrapper = unwrap(content);
  const currentChildren = Array.from(target.children);
  const newChildren = wrapper.children as (DOMElement)[];

  if (isTag(target, "head")) {
    // Keep current tags on first hydration
    if (!target.hasAttribute("data-h")) {
      target.setAttribute("data-h", "");
      return target;
    }

    // Create tag type sets for fast lookup
    const styleTagTypes = new Set(["style", "link"]);
    
    // Handle non-style/link tags first
    const regularTags = (newChildren as DOMElement[]).filter((child) =>
      !styleTagTypes.has(child.tagName.toLowerCase())
    );

    // Handle style/link tags separately
    const styleTags = (newChildren as DOMElement[]).filter((child) =>
      styleTagTypes.has(child.tagName.toLowerCase())
    );

    // Create maps for existing tags
    const existingStyles = new Map(
      (currentChildren as DOMElement[]).filter((child) =>
        styleTagTypes.has(child.tagName.toLowerCase())
      )
        .map((child) => [getTagKey(child), child]),
    );

    // Process regular tags normally
    regularTags.forEach((newChild) => {
      const key = getTagKey(newChild);
      const existing = currentChildren.find((child) =>
        getTagKey(child) === key
      );
      if (existing) {
        existing.replaceWith(newChild);
      } else {
        target.appendChild(newChild);
      }
    });

    // Process style tags with special handling
    styleTags.forEach((newChild) => {
      const key = getTagKey(newChild);
      const existing = existingStyles.get(key);

      // Skip if tag already exists with same content+id/href
      if (existing) {
        // istanbul ignore next - try again later
        if (isTag(existing, "style") && isTag(newChild, "style")) {
          if (
            existing.textContent === newChild.textContent &&
            existing.id === newChild.id
          ) return;
        }
        // istanbul ignore next - try again later
        if (isTag(existing, "link") && isTag(newChild, "link")) {
          if (
            (existing as HTMLAnchorElement).href ===
              (newChild as HTMLAnchorElement).href
          ) return;
        }
      }

      // For link tags, add with disabled state first
      // istanbul ignore else - try again later
      if (isTag(newChild, "link")) {
        const temp = newChild.cloneNode() as HTMLLinkElement;
        temp.disabled = true;

        const originalRel = temp.rel;
        temp.rel = "preload";
        temp.as = "style";
        // istanbul ignore next
        temp.onload = () => {
          temp.rel = originalRel;
          temp.removeAttribute("as");
          temp.disabled = false;
          if (existing && existing.parentNode === target) {
            existing.remove();
          }
        };

        target.appendChild(temp);
      } // For style tags, add new one first
      else if (isTag(newChild, "style")) {
        target.appendChild(newChild);
        // istanbul ignore next - try again later
        if (existing && existing.parentNode === target) {
          // Remove old one in next frame
          existing.remove();
        }
      }
    });
  } else {
    //  Handle Initial Hydration
    if (!target.hasAttribute("data-h")) {
      if (
        hasHydrationKeys(target) &&
        currentChildren.length === newChildren.length
      ) {
        currentChildren.forEach((child, i) => {
          child.replaceChildren(...Array.from(newChildren[i].childNodes));
        });
      } else target.replaceChildren(...newChildren);
      target.setAttribute("data-h", "");
      //  Handle Subsequent Hydration
    } else {
      target.replaceChildren(...newChildren);
    }
  }

  return target;
};
