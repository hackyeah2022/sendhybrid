import { FC } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({ ...props }) => {
  return <PageContainer {...props}>Login</PageContainer>;
};

export default LoginPage;
