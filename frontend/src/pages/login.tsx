import { FC } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';
import LoginForm from 'components/organisms/LoginForm/LoginForm';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({ ...props }) => {
  return (
    <PageContainer centerContent {...props}>
      <LoginForm />
    </PageContainer>
  );
};

export default LoginPage;
