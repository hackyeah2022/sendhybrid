import { FC } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import routes from 'utils/routes';
import ArrowLeft from 'icons/ArrowLeft';
import PageContainerBase from 'components/atoms/PageContainer/PageContainer';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import Logo from 'components/atoms/Logo/Logo';

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
        <Logo />
      </PageContentWrapper>
    </PageContainer>
  );
};

export default LoginPage;
