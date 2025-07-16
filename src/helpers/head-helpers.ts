export const parseAttributes = (attributeString: string) => {
  const attributes: Record<string, string> = {};
  const attributeRegex = /([a-zA-Z0-9_-]+)(?:="([^"]*?)")?/g;
  let match;

  while ((match = attributeRegex.exec(attributeString)) !== null) {
    const name = match[1];
    const value = match[2] || /* istanbul ignore next */ "";
    attributes[name] = value;
  }

  return attributes;
};

const getTagAttribute = (tag: Element) => {
  const attributes = [
    "name",
    "property",
    "charset",
    "viewport",
    "media",
    "http-equiv",
    "rel",
    "src",
    "href",
    "id",
  ];

  for (const attr of attributes) {
    const value = tag.getAttribute(attr);

    if (value) return value;
  }
  return "";
};

export const getTagKey = (tag: Element) => {
  return tag.tagName +
    (tag.tagName !== "TITLE" ? `.${getTagAttribute(tag)}` : "");
};
