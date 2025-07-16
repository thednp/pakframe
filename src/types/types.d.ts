import type {
  Properties,
  PropertiesHyphen,
  SvgProperties,
  SvgPropertiesHyphen,
} from "csstype";
import type { MathMLElementTags } from "./MathML";
import "./global";
export type { MathMLElementTags };

export interface ContextEntry {
  execute: () => void;
  dependencies: Set<Set<ContextEntry>>;
  cleanup?: () => void;
}

export type Accessor<T> = () => T;
export type Setter<T> = (
  val: T | ((v: T) => T),
) => T extends Function ? T : void;
export type ObserverFn = () => void;

export type DOMElement = HTMLElement | SVGElement | MathMLElement;

export type StoreObject = {
  [key: string]: StoreValue;
} | { [key: string]: unknown };

export type Primitive = symbol | string | number | boolean | bigint;
export type FNObject = Date | RegExp;
export type StoreValue =
  | FNObject
  | Primitive
  | StoreObject
  | StoreObject[]
  | Primitive[];
export type PropValue = Omit<Primitive, bigint | symbol> | null;

export type PropValueOrAccessor = FunctionMaybe<PropValue>;
export type PropsWithKnownKeys<T> = Partial<
  {
    // [K in keyof T]: PropValueOrAccessor;
    [K in keyof T]: FunctionMaybe<T[K]>;
  }
>;

export type FunctionMaybe<T = unknown> = Accessor<T> | T | undefined;

export type AllCSSProperties =
  & Properties
  & PropertiesHyphen
  & SvgProperties
  & SvgPropertiesHyphen;
export type CSSProperties = {
  [K in keyof AllCSSProperties]: FunctionMaybe<AllCSSProperties[K]>;
};

export interface DOMTagNameMap
  extends
    HTMLElementTagNameMap,
    HTMLElementDeprecatedTagNameMap,
    Omit<SVGElementTagNameMap, "a" | "title" | "style" | "script">,
    // MathMLElementTags { };
    MathMLElementTagNameMap {}

export type TagNames = keyof DOMTagNameMap;
export type OutputElement<K extends TagNames> = K extends
  keyof MathMLElementTags ? MathMLElement : DOMTagNameMap[K];
export type PotentialProps<K extends TagNames> = K extends
  keyof MathMLElementTags ? MathMLElementTags[K] : DOMTagNameMap[K];

export type DOMNodeAttributes<T extends PotentialProps<K>, K extends TagNames> =
  & Omit<PropsWithKnownKeys<T>, `on${string}` | "style">
  & {
    style?: FunctionMaybe<string | CSSProperties | undefined | null>;
    class?: FunctionMaybe<string>;
    // is?: string;
    [key: `on${string}`]: (() => void) | EventListenerObject["handleEvent"];
    [key: `data-${string}`]: FunctionMaybe<Primitive>;
    [key: `aria-${string}`]: FunctionMaybe<string>;
  };

export type MaybeChildNode =
  | Primitive
  | undefined
  | null
  | DOMElement
  | ChildArray
  | ChildAccessor
  | (string & {});

export interface ChildArray extends Array<MaybeChildNode> {}
export interface ChildAccessor {
  (): MaybeChildNode;
}
