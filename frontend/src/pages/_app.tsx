import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';

import theme from 'utils/styled/theme';
import GlobalStyle from 'utils/styled/GlobalStyle';
import Layout from 'components/templates/Layout/Layout';

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import NProgress from "nprogress"
import "nprogress/nprogress.css";

const CustomApp = ({ Component, pageProps, router }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const Router = useRouter()
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MantineProvider>
        <NotificationsProvider>
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <AnimatePresence initial={false} mode="wait">
                  <Component key={router.pathname} {...pageProps} />
                </AnimatePresence>
              </Hydrate>
            </QueryClientProvider>
          </Layout>
        </NotificationsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default CustomApp;
