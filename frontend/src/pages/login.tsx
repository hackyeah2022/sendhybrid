import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import routes from 'utils/routes';
import ArrowLeft from 'icons/ArrowLeft';
import PageContainerBase from 'components/atoms/PageContainer/PageContainer';
import LoginForm from 'components/organisms/LoginForm/LoginForm';

export interface LoginPageProps {}

const PageContainer = styled(PageContainerBase)`
  margin-top: -4rem;
`;

const GoBackWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.neutral[4]};

  &:hover {
    cursor: pointer;

    div {
      transform: translateX(-20%);
    }
  }
`;

const BackArrowWrapper = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.5rem;
  transition: transform 200ms;
`;

const LogoWrapper = styled.div`
  position: relative;
  top: 1rem;
  width: 10rem;
  height: 10rem;
  transform: scale(3.5);
`;

const LogoImage = styled(Image)`
  object-fit: cover;
`;

const PageContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11rem;
`;

const LoginPage: FC<LoginPageProps> = ({ ...props }) => {
  const router = useRouter();
  return (
    <PageContainer centerContent {...props}>
      <PageContentWrapper>
        <div>
          <GoBackWrapper onClick={() => router.push(routes.LANDING)}>
            <BackArrowWrapper>
              <ArrowLeft />
            </BackArrowWrapper>
            <span>Powrót do strony głównej</span>
          </GoBackWrapper>
          <LoginForm />
        </div>
        <LogoWrapper>
          <LogoImage src="/logo.png" layout="fill" />
        </LogoWrapper>
      </PageContentWrapper>
    </PageContainer>
  );
};

export default LoginPage;
