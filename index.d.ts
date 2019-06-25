
declare module 'es6-json-stable-stringify' {
  interface Options {
    space?: string;
    comparator?: function;
    replacer?: function;
    cycles?: boolean;
  }

  function stringify(
    obj: any,
    options?: Options,
  ): string;

  export = stringify;
}
