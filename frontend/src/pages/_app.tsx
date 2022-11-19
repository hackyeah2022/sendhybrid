import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from 'utils/styled/theme';
import GlobalStyle from 'utils/styled/GlobalStyle';
import Layout from 'components/templates/Layout/Layout';

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

const queryClient = new QueryClient();

const CustomApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MantineProvider>
        <NotificationsProvider>
          <Layout>
            <QueryClientProvider client={queryClient}>
              <AnimatePresence initial={false} mode="wait">
                <Component key={router.pathname} {...pageProps} />
              </AnimatePresence>
            </QueryClientProvider>
          </Layout>
        </NotificationsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default CustomApp;
