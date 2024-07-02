/** @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  importOrder: [
    '^.*\\.(scss|css)$',
    '^.*\\.json$',
    '^@(.*)$',
    '^\\..*$',
    '^~/(.*)(?<!\\.(less|json|scss|css))$',
  ],
  importOrderCaseInsensitive: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
};

export default config;
