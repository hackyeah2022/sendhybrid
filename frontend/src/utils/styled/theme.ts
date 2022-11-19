const colors = {
  white: '#ffffff',
  black: '#1b1b1b',
  lightGray: '#f1f1f1',
  mediumLightGray: '#c1c1c1',
  gray: '#656565',
  blue: '#0052a5',
  lightBlue: '#006cd7',
  red: '#d5233f',
  neutral: ['#f1f1f1', '#dcdcdc', '#b3b3b3', '#727272', '#3f3f3f', '#1b1b1b'],
  primary: ['#daedff', '#4286ca', '#003c78', '#002952'],
  secondary: ['#fbabb8', '#d5233f', '#892121', '#521111'],
  accent: ['#caedce', '#42e054', '#1f962d', '#06450d'],
};

const layout = {
  navBarHeight: '4rem',
};

const zIndexes = {
  navBar: 500,
  debug: 9999,
};

const theme = { colors, layout, zIndexes };

export type CustomTheme = typeof theme;
export { colors };
export default theme;
