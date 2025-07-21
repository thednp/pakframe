import { Properties, PropertiesHyphen, SvgProperties, SvgPropertiesHyphen } from "csstype";

//#region src/types/MathML.d.ts
/** @type {MathMLElementTagNameMap} */
interface MathMLElementTags {
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/annotation
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  annotation: MathMLAnnotationElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/annotation-xml
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  "annotation-xml": MathMLAnnotationXmlElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/math
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  math: MathMLMathElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/merror
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  merror: MathMLErrorElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mfrac: MathMLMfracElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mi: MathMLMiElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mmultiscripts: MathMLMmultiscriptsElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mn
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mn: MathMLMnElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mo: MathMLMoElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mover
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mover: MathMLMoverElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mpadded
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mpadded: MathMLMpaddedElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mphantom
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mphantom: MathMLMphantomElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mprescripts
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mprescripts: MathMLMprescriptsElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mroot
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mroot: MathMLMrootElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mrow
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mrow: MathMLMrowElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  ms: MathMLMsElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mspace
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mspace: MathMLMspaceElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msqrt
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  msqrt: MathMLMsqrtElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mstyle: MathMLMstyleElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  msub: MathMLMsubElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  msubsup: MathMLMsubsupElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msup
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  msup: MathMLMsupElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mtable: MathMLMtableElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mtd: MathMLMtdElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtext
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mtext: MathMLMtextElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mtr: MathMLMtrElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munder
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  munder: MathMLMunderElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munderover
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  munderover: MathMLMunderoverElementAttributes<MathMLElement>;
  /**
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  semantics: MathMLSemanticsElementAttributes<MathMLElement>;
  /**
   * @non-standard
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  menclose: MathMLMencloseElementAttributes<MathMLElement>;
  /**
   * @deprecated
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  maction: MathMLMactionElementAttributes<MathMLElement>;
  /**
   * @deprecated
   * @non-standard
   * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfenced
   * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
   */
  mfenced: MathMLMfencedElementAttributes<MathMLElement>;
}

/** MathML-specific attribute interfaces */
interface MathMLAttributes<T, K extends keyof MathMLElementTags> extends DOMNodeAttributes<T, K> {
  displaystyle?: FunctionMaybe<boolean | "true" | "false">;
  /** @deprecated */
  href?: FunctionMaybe<string>;
  /** @deprecated */
  mathbackground?: FunctionMaybe<string>;
  /** @deprecated */
  mathcolor?: FunctionMaybe<string>;
  /** @deprecated */
  mathsize?: FunctionMaybe<string>;
  nonce?: FunctionMaybe<string>;
  scriptlevel?: FunctionMaybe<string>;
  children?: MaybeChildNode;
}
interface MathMLAnnotationElementAttributes<T> extends MathMLAttributes<T, "annotation"> {
  encoding?: FunctionMaybe<string>;
  /** @deprecated */
  src?: FunctionMaybe<string>;
}
interface MathMLAnnotationXmlElementAttributes<T> extends MathMLAttributes<T, "annotation-xml"> {
  encoding?: FunctionMaybe<string>;
  /** @deprecated */
  src?: FunctionMaybe<string>;
}
interface MathMLMactionElementAttributes<T> extends MathMLAttributes<T, "maction"> {
  /**
   * @deprecated
   * @non-standard
   */
  actiontype?: FunctionMaybe<"statusline" | "toggle">;
  /**
   * @deprecated
   * @non-standard
   */
  selection?: FunctionMaybe<string>;
}
interface MathMLMathElementAttributes<T> extends MathMLAttributes<T, "math"> {
  display?: FunctionMaybe<"block" | "inline">;
}
interface MathMLErrorElementAttributes<T> extends MathMLAttributes<T, "merror"> {}
interface MathMLMfracElementAttributes<T> extends MathMLAttributes<T, "mfrac"> {
  linethickness?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  denomalign?: FunctionMaybe<"center" | "left" | "right">;
  /**
   * @deprecated
   * @non-standard
   */
  numalign?: FunctionMaybe<"center" | "left" | "right">;
}
interface MathMLMiElementAttributes<T> extends MathMLAttributes<T, "mi"> {
  mathvariant?: FunctionMaybe<"normal" | "italic" | "oblique">;
}
interface MathMLMmultiscriptsElementAttributes<T> extends MathMLAttributes<T, "mmultiscripts"> {
  /**
   * @deprecated
   * @non-standard
   */
  subscriptshift?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  superscriptshift?: FunctionMaybe<string>;
}
interface MathMLMnElementAttributes<T> extends MathMLAttributes<T, "mn"> {}
interface MathMLMoElementAttributes<T> extends MathMLAttributes<T, "mo"> {
  fence?: FunctionMaybe<boolean | "true" | "false">;
  form?: FunctionMaybe<"prefix" | "infix" | "postfix">;
  largeop?: FunctionMaybe<boolean | "true" | "false">;
  lspace?: FunctionMaybe<string>;
  maxsize?: FunctionMaybe<string>;
  minsize?: FunctionMaybe<string>;
  movablelimits?: FunctionMaybe<boolean | "true" | "false">;
  rspace?: FunctionMaybe<string>;
  separator?: FunctionMaybe<boolean | "true" | "false">;
  stretchy?: FunctionMaybe<boolean | "true" | "false">;
  symmetric?: FunctionMaybe<boolean | "true" | "false">;
  /** @non-standard */
  accent?: FunctionMaybe<boolean | "true" | "false">;
}
interface MathMLMoverElementAttributes<T> extends MathMLAttributes<T, "mo"> {
  accent?: FunctionMaybe<boolean | "true" | "false">;
}
interface MathMLMpaddedElementAttributes<T> extends MathMLAttributes<T, "mpadded"> {
  depth?: FunctionMaybe<string>;
  height?: FunctionMaybe<string>;
  lspace?: FunctionMaybe<string>;
  voffset?: FunctionMaybe<string>;
  width?: FunctionMaybe<string>;
}
interface MathMLMphantomElementAttributes<T> extends MathMLAttributes<T, "mphantom"> {}
interface MathMLMprescriptsElementAttributes<T> extends MathMLAttributes<T, "mprescripts"> {}
interface MathMLMrootElementAttributes<T> extends MathMLAttributes<T, "mroot"> {}
interface MathMLMrowElementAttributes<T> extends MathMLAttributes<T, "mrow"> {}
interface MathMLMsElementAttributes<T> extends MathMLAttributes<T, "ms"> {
  /** @deprecated */
  lquote?: FunctionMaybe<string>;
  /** @deprecated */
  rquote?: FunctionMaybe<string>;
}
interface MathMLMspaceElementAttributes<T> extends MathMLAttributes<T, "mspace"> {
  depth?: FunctionMaybe<string>;
  height?: FunctionMaybe<string>;
  width?: FunctionMaybe<string>;
}
interface MathMLMsqrtElementAttributes<T> extends MathMLAttributes<T, "msqrt"> {}
interface MathMLMstyleElementAttributes<T> extends MathMLAttributes<T, "mstyle"> {
  /**
   * @deprecated
   * @non-standard
   */
  background?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  color?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  fontsize?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  fontstyle?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  fontweight?: FunctionMaybe<string>;
  /** @deprecated */
  scriptminsize?: FunctionMaybe<string>;
  /** @deprecated */
  scriptsizemultiplier?: FunctionMaybe<string>;
}
interface MathMLMsubElementAttributes<T> extends MathMLAttributes<T, "msub"> {
  /**
   * @deprecated
   * @non-standard
   */
  subscriptshift?: FunctionMaybe<string>;
}
interface MathMLMsubsupElementAttributes<T> extends MathMLAttributes<T, "msubsup"> {
  /**
   * @deprecated
   * @non-standard
   */
  subscriptshift?: FunctionMaybe<string>;
  /**
   * @deprecated
   * @non-standard
   */
  superscriptshift?: FunctionMaybe<string>;
}
interface MathMLMsupElementAttributes<T> extends MathMLAttributes<T, "msup"> {
  /**
   * @deprecated
   * @non-standard
   */
  superscriptshift?: FunctionMaybe<string>;
}
interface MathMLMtableElementAttributes<T> extends MathMLAttributes<T, "mtable"> {
  /** @non-standard */
  align?: FunctionMaybe<"axis" | "baseline" | "bottom" | "center" | "top">;
  /** @non-standard */
  columnalign?: FunctionMaybe<"center" | "left" | "right">;
  /** @non-standard */
  columnlines?: FunctionMaybe<"dashed" | "none" | "solid">;
  /** @non-standard */
  columnspacing?: FunctionMaybe<string>;
  /** @non-standard */
  frame?: FunctionMaybe<"dashed" | "none" | "solid">;
  /** @non-standard */
  framespacing?: FunctionMaybe<string>;
  /** @non-standard */
  rowalign?: FunctionMaybe<"axis" | "baseline" | "bottom" | "center" | "top">;
  /** @non-standard */
  rowlines?: FunctionMaybe<"dashed" | "none" | "solid">;
  /** @non-standard */
  rowspacing?: FunctionMaybe<string>;
  /** @non-standard */
  width?: FunctionMaybe<string>;
}
interface MathMLMtdElementAttributes<T> extends MathMLAttributes<T, "mtd"> {
  columnspan?: FunctionMaybe<number | string>;
  rowspan?: FunctionMaybe<number | string>;
  /** @non-standard */
  columnalign?: FunctionMaybe<"center" | "left" | "right">;
  /** @non-standard */
  rowalign?: FunctionMaybe<"axis" | "baseline" | "bottom" | "center" | "top">;
}
interface MathMLMtextElementAttributes<T> extends MathMLAttributes<T, "mtext"> {}
interface MathMLMtrElementAttributes<T> extends MathMLAttributes<T, "mtr"> {
  /** @non-standard */
  columnalign?: FunctionMaybe<"center" | "left" | "right">;
  /** @non-standard */
  rowalign?: FunctionMaybe<"axis" | "baseline" | "bottom" | "center" | "top">;
}
interface MathMLMunderElementAttributes<T> extends MathMLAttributes<T, "munder"> {
  accentunder?: FunctionMaybe<"" | boolean>;
}
interface MathMLMunderoverElementAttributes<T> extends MathMLAttributes<T, "munderover"> {
  accent?: FunctionMaybe<"" | boolean>;
  accentunder?: FunctionMaybe<"" | boolean>;
}
interface MathMLSemanticsElementAttributes<T> extends MathMLAttributes<T, "semantics"> {}
interface MathMLMencloseElementAttributes<T> extends MathMLAttributes<T, "menclose"> {
  /** @non-standard */
  notation?: FunctionMaybe<string>;
}
interface MathMLMfencedElementAttributes<T> extends MathMLAttributes<T, "mfenced"> {
  close?: FunctionMaybe<string>;
  open?: FunctionMaybe<string>;
  separators?: FunctionMaybe<string>;
}
//#endregion
//#region src/types/global.d.ts
declare module "@core" {
  export * from "pakframe";
}
declare module "@ssr" {
  export * from "pakframe/ssr";
}
declare module "@router" {
  export * from "pakframe/router";
}
declare module "@pakframe/router" {
  export * from "pakframe/router";
}
declare module "@meta" {
  export * from "pakframe/meta";
}
//#endregion
//#region src/types/types.d.ts
interface ContextEntry {
  execute: () => void;
  dependencies: Set<Set<ContextEntry>>;
  cleanup?: () => void;
}
type Accessor<T> = () => T;
type Setter<T> = (val: T | ((v: T) => T)) => T extends Function ? T : void;
type ObserverFn = () => void;
type DOMElement = HTMLElement | SVGElement | MathMLElement;
type StoreObject = {
  [key: string]: StoreValue;
} | {
  [key: string]: unknown;
};
type Primitive = symbol | string | number | boolean | bigint;
type FNObject = Date | RegExp;
type StoreValue = FNObject | Primitive | StoreObject | StoreObject[] | Primitive[];
type PropValue = Omit<Primitive, bigint | symbol> | null;
type PropValueOrAccessor = FunctionMaybe<PropValue>;
type PropsWithKnownKeys<T> = Partial<{
  // [K in keyof T]: PropValueOrAccessor;
[K in keyof T]: FunctionMaybe<T[K]> }>;
type FunctionMaybe<T = unknown> = Accessor<T> | T | undefined;
type AllCSSProperties = Properties & PropertiesHyphen & SvgProperties & SvgPropertiesHyphen;
type CSSProperties = { [K in keyof AllCSSProperties]: FunctionMaybe<AllCSSProperties[K]> };
interface DOMTagNameMap extends HTMLElementTagNameMap, HTMLElementDeprecatedTagNameMap, Omit<SVGElementTagNameMap, "a" | "title" | "style" | "script">,
// MathMLElementTags { };
MathMLElementTagNameMap {}
type TagNames = keyof DOMTagNameMap;
type OutputElement<K extends TagNames> = K extends keyof MathMLElementTags ? MathMLElement : DOMTagNameMap[K];
type PotentialProps<K extends TagNames> = K extends keyof MathMLElementTags ? MathMLElementTags[K] : DOMTagNameMap[K];
type DOMNodeAttributes<T extends PotentialProps<K>, K extends TagNames> = Omit<PropsWithKnownKeys<T>, `on${string}` | "style"> & {
  style?: FunctionMaybe<string | CSSProperties | undefined | null>;
  class?: FunctionMaybe<string>;
  // is?: string;
  [key: `on${string}`]: (() => void) | EventListenerObject["handleEvent"];
  [key: `data-${string}`]: FunctionMaybe<Primitive>;
  [key: `aria-${string}`]: FunctionMaybe<string>;
};
type MaybeChildNode = Primitive | undefined | null | DOMElement | ChildArray | ChildAccessor | (string & {});
interface ChildArray extends Array<MaybeChildNode> {}
interface ChildAccessor {
  (): MaybeChildNode;
}
//#endregion
export { Accessor, AllCSSProperties, CSSProperties, ChildAccessor, ChildArray, ContextEntry, DOMElement, DOMNodeAttributes, DOMTagNameMap, FNObject, FunctionMaybe, type MathMLElementTags, MaybeChildNode, ObserverFn, OutputElement, PotentialProps, Primitive, PropValue, PropValueOrAccessor, PropsWithKnownKeys, Setter, StoreObject, StoreValue, TagNames };
//# sourceMappingURL=types-CjexJQM1.d.cts.map