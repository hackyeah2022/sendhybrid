import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import theme from 'utils/styled/theme';
import GlobalStyle from 'utils/styled/GlobalStyle';
import Layout from 'components/templates/Layout/Layout';

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

const CustomApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <AnimatePresence initial={false} mode="wait">
          <Component key={router.pathname} {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
};

export default CustomApp;
