import type { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import PageContainerBase from 'components/atoms/PageContainer/PageContainer';
import Logo from 'components/atoms/Logo/Logo';

export interface LandingPageProps {}

const PageContainer = styled(PageContainerBase)`
  margin-top: 4rem;
`;

const VerticalLine = styled.div`
  width: 24rem;
  height: 2px;
  margin: 0.5rem 0 1rem 0;
  background-color: ${({ theme }) => theme.colors.secondary[1]};
`;

const AppInfo = styled.p`
  width: 24rem;
  color: ${({ theme }) => theme.colors.neutral[4]};
`;

const PageHeading = styled.h1`
  font-size: 64px;
  color: ${({ theme }) => theme.colors.primary[3]};
`;

const HorizontalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Landing: FC<LandingPageProps> = () => {
  return (
    <PageContainer>
      <Head>
        <title>StampIT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HorizontalRow>
        <div>
          <PageHeading>StampIT</PageHeading>
          <VerticalLine />
          <AppInfo>
            Dzięki <strong>StampIT</strong> możesz wysłać dokument tekstowy w
            wielu formatach, który zostanie dostarczony do odbiorcy, jako
            papierowy list! <i>#GoHybrid</i>
          </AppInfo>
        </div>
        <Logo />
      </HorizontalRow>
    </PageContainer>
  );
};

export default Landing;
