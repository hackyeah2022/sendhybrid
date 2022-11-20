import { FC } from 'react';

import PageContainer from 'components/atoms/PageContainer/PageContainer';

export interface Props {}

const AdminDashboardPage: FC<Props> = ({ ...props }) => {
  return (
    <PageContainer centerContent {...props}>
      Panel administratora
    </PageContainer>
  );
};

export default AdminDashboardPage;
