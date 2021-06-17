export type Selector = string;

type QueryParam = any;
// No way to support [Selector, ...QueryParam[]]?
// 10 params should be more than enough, hopefully.
export type SelectorWithQueryParams =
  | [Selector, QueryParam]
  | [Selector, QueryParam, QueryParam]
  | [Selector, QueryParam, QueryParam, QueryParam]
  | [Selector, QueryParam, QueryParam, QueryParam, QueryParam]
  | [Selector, QueryParam, QueryParam, QueryParam, QueryParam, QueryParam]
  | [
      Selector,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam
    ]
  | [
      Selector,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam
    ]
  | [
      Selector,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam
    ]
  | [
      Selector,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam
    ]
  | [
      Selector,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam,
      QueryParam
    ];

export type Context = any;

export interface Options {
  data: Context;
  allowRegexp?: boolean;
  cb?: boolean;
  asyncify?: boolean;
}
