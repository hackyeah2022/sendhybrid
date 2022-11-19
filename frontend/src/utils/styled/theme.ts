const colors = {
  white: '#ffffff',
  black: '#1b1b1b',
  lightGray: '#f1f1f1',
  gray: '#656565',
  blue: '#0052a5',
  lightBlue: '#006cd7',
  red: '#d5233f',
};

const zIndexes = {
  debug: 9999,
};

const theme = { colors, zIndexes };

export type CustomTheme = typeof theme;
export { colors };
export default theme;
